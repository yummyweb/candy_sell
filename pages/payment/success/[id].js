import Head from 'next/head'
import Navbar from '../../../components/Navbar'
import { useEffect, useState } from 'react'
import styles from '../../../styles/Success.module.css'
import { useRouter } from 'next/router'
import supabase from '../../../utils/client'
import axios from 'axios'

export default function Success() {
    const [onboardingModal, setOnboardingModal] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function redirectToSeller() {
            if (router.query.id) {
                axios.post("/api/redeem/purchase", {
                    txId: router.query.id
                })

                const { data: txData, error } = await supabase
                    .from("transaction")
                    .select("*")
                    .eq("tx_id", router.query.id)
                
                const productId = txData[0].product

                const { data: productData, _ } = await supabase
                    .from("product")
                    .select("*")
                    .eq("id", productId)
                
                const pubKey = productData[0].user

                const { data: userData, __ } = await supabase
                    .from("user")
                    .select("*")
                    .eq("public_key", pubKey)

                router.push(window.location.origin + "/@/" + userData[0].username)
            }
        }

        setTimeout(() => {
            redirectToSeller()
        }, 2000)
    }, [router])

    return (
        <div className={styles.container}>
            <Head>
                <title>candy_sell - First Content Marketplace on Solana</title>
                <meta name="description" content="CandySell is the first content marketplace on Solana using CandyPay." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar setOnboardingModal={setOnboardingModal} />
            <div className={styles.details}>
                <h1>Your payment was successful!</h1>
                <p className={styles.redirect}>Do not refresh/reload the webpage while we process your transaction.</p>
                <p className={styles.redirect}>Redirecting you to the seller&apos;s profile.</p>
            </div>
        </div>
    )
}
