import Head from 'next/head'
import styles from '../styles/Discover.module.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import ProductsList from '../components/ProductsList'
import DiscoverHeader from '../components/DiscoverHeader'

export default function Discover() {
  const [onboardingModal, setOnboardingModal] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>candy_sell - First Content Marketplace on Solana</title>
        <meta name="description" content="CandySell is the first content marketplace on Solana using CandyPay." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setOnboardingModal={setOnboardingModal} />
      <DiscoverHeader />
      <ProductsList />
    </div>
  )
}
