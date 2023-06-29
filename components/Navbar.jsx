import styles from "../styles/Navbar.module.css"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SigninMessage } from "../utils/SigninMessage";
import base58 from "bs58";
import Button from "./Button";
import supabase from "../utils/client";

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
)

function Navbar({ setOnboardingModal }) {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const wallet = useWallet();
    const walletModal = useWalletModal()

    const handleSignIn = async () => {
        try {
            let firstTimeUser = true

            if (!wallet.connected) {
                walletModal.setVisible(true);
            }

            let { data: users, error } = await supabase
                .from('user')
                .select('public_key')

            const csrf = await getCsrfToken();
            if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

            for (let i = 0; i < users.length; i++) {
                if (users[i].public_key === wallet.publicKey.toString()) {
                    firstTimeUser = false
                }
            }

            const message = new SigninMessage({
                domain: window.location.host,
                publicKey: wallet.publicKey.toBase58(),
                statement: `Sign this message to verify your identity.`,
                nonce: csrf,
            })

            const data = new TextEncoder().encode(message.prepare());
            const signature = await wallet.signMessage(data);
            const serializedSignature = base58.encode(signature);

            signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature: serializedSignature,
            })

            if (firstTimeUser) {
                setOnboardingModal(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (wallet.connected && status === "unauthenticated") {
            handleSignIn();
        }
    }, [wallet.connected]);

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_left}>
                <p>candy_sell</p>
            </div>
            <div className={styles.navbar_center}>
                <Link href="/">Home</Link>
                <Link href="/discover">Discover</Link>
                <Link href="/what-is-candy-sell">What is candy_sell?</Link>
                {!session ? <Link href="/community">Community</Link> : <Link href="/dashboard">Dashboard</Link>}
            </div>
            <div className={styles.navbar_right}>
                {/* <button>Connect Wallet</button> */}
                {!session ? <WalletMultiButtonDynamic /> : <Button onClick={() => {
                    wallet.disconnect()
                    signOut()
                }}>Log Out</Button>}
            </div>
        </div>
    )
}

export default Navbar