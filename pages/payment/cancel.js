import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { useState } from 'react'
import styles from '../../styles/Cancel.module.css'

export default function Cancel() {
    const [onboardingModal, setOnboardingModal] = useState(false)

    return (
        <div className={styles.container}>
            <Head>
                <title>candy_sell - First Content Marketplace on Solana</title>
                <meta name="description" content="CandySell is the first content marketplace on Solana using CandyPay." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar setOnboardingModal={setOnboardingModal} />
            <div className={styles.details}>
                <h1>Your payment was cancelled.</h1>
                <p className={styles.redirect}>Redirecting you to the seller's profile.</p>
            </div>
        </div>
    )
}
