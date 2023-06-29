import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/What.module.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'

export default function What() {
    const [onboardingModal, setOnboardingModal] = useState(false)

    return (
        <div className={styles.container}>
            <Head>
                <title>candy_sell - First Content Marketplace on Solana</title>
                <meta name="description" content="CandySell is the first content marketplace on Solana using CandyPay." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar setOnboardingModal={setOnboardingModal} />
        </div>
    )
}
