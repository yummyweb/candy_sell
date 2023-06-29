import Head from 'next/head'
import styles from '../styles/Dashboard.module.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import DashboardBody from '../components/DashboardBody'

export default function Dashboard() {
  const [onboardingModal, setOnboardingModal] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>candy_sell - First Content Marketplace on Solana</title>
        <meta name="description" content="CandySell is the first content marketplace on Solana using CandyPay." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setOnboardingModal={setOnboardingModal} />
      <DashboardHeader />
      <DashboardBody />
    </div>
  )
}
