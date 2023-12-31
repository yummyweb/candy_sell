import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useState } from 'react'

export default function Home() {
  const [onboardingModal, setOnboardingModal] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>candy_sell - First Content Marketplace on Solana</title>
        <meta name="description" content="CandySell is the first content marketplace on Solana using CandyPay." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setOnboardingModal={setOnboardingModal} />
      <Hero onboardingModal={onboardingModal} setOnboardingModal={setOnboardingModal} />
    </div>
  )
}
