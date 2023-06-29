import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SigninMessage } from "../../../utils/SigninMessage";
import { SupabaseAdapter } from "@auth/supabase-adapter"
import supabase from "../../../utils/client";

export default async function auth(req, res) {
    const providers = [
        CredentialsProvider({
            name: "Solana",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                },
            },
            async authorize(credentials, req) {
                try {
                    const signinMessage = new SigninMessage(
                        JSON.parse(credentials?.message || "{}")
                    );
                    const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);
                    if (signinMessage.domain !== nextAuthUrl.host) {
                        return null;
                    }

                    const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

                    if (signinMessage.nonce !== csrfToken) {
                        return null;
                    }

                    const validationResult = await signinMessage.validate(
                        credentials?.signature || ""
                    );

                    if (!validationResult)
                        throw new Error("Could not validate the signed message");

                    return {
                        id: signinMessage.publicKey,
                    };
                } catch (e) {
                    return null;
                }
            },
        }),
    ];

    const isDefaultSigninPage =
        req.method === "GET" && req.query.nextauth.includes("signin");

    // Hides Sign-In with Solana from the default sign page
    if (isDefaultSigninPage) {
        providers.pop();
    }

    return await NextAuth(req, res, {
        providers,
        session: {
            strategy: "jwt",
        },
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            async session({ session, token }) {
                session.publicKey = token.sub
                if (session.user) {
                    let { data, error } = await supabase
                        .from('user')
                        .select('*')
                        .eq('public_key', token.sub)

                    if (!error && data !== null) {
                        session.user.products_sold = data[0].products_sold
                        session.user.total_sales = data[0].total_sales
                        session.user.follower_count = data[0].follower_count
                        session.user.is_seller = data[0].is_seller
                        session.user.email = data[0].email
                        session.user.username = data[0].username
                    }

                    session.user.publicKey = token.sub
                    session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
                }
                return session;
            },
            async signIn({ user }) {
                let firstTimeUser = true
                let { data, error } = await supabase
                    .from('user')
                    .select('public_key')

                if (error) {
                    return false
                }

                for (let i = 0; i < data.length; i++) {
                    if (data[i].public_key === user.id) {
                        firstTimeUser = false
                    }
                }

                if (firstTimeUser) {
                    const { data, error } = await supabase
                        .from('user')
                        .insert([
                            { is_seller: false, public_key: user.id, email: '' },
                        ])
                }

                return true
            }
        },
    });
}