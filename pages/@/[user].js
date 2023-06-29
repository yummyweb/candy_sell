import { useRouter } from 'next/router'
import styles from '../../styles/UserProfile.module.css'
import Navbar from '../../components/Navbar'
import Head from 'next/head'
import ProfileHeader from '../../components/ProfileHeader'
import { useEffect, useState } from 'react'
import supabase from '../../utils/client'
import UserProducts from '../../components/UserProducts'

function UserProfile() {
    const router = useRouter()
    const [profileExists, setProfileExists] = useState(false)
    const [profileData, setProfileData] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            if (router.query.user) {
                const { data, error } = await supabase
                    .from('user')
                    .select('*')
                    .eq("username", router.query.user)

                if (data.length !== 0) {
                    setProfileExists(true)
                    setProfileData(data[0])
                }
            }
        }
        fetchUser()
    }, [router])

    return (
        <div className={styles.container}>
            <Head>
                <title>candy_sell - First Content Marketplace on Solana</title>
                <meta name="description" content="CandySell is the first content marketplace on Solana using CandyPay." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            {profileData && profileExists ? 
            (
                <>
                    <ProfileHeader username={router.query.user} />
                    <UserProducts username={router.query.user} publicKey={profileData.public_key} />
                </>
            ) : <h1 style={{ textAlign: "center", marginTop: "10rem" }}>Hmm... this user does not exist.</h1>}
        </div>
    )
}

export default UserProfile