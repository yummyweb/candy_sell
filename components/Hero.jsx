import styles from "../styles/Hero.module.css"
import OnboardingModal from "./OnboardingModal"

function Hero({ onboardingModal, setOnboardingModal }) {
    return (
        <>
            <main className={styles.hero}>
                <div className={styles.hero_left}>
                    <div className={styles.hero_text}>
                        <h1 className={styles.hero_title}>Buy and Sell Digital Goods on Solana</h1>
                        <p className={styles.hero_subtitle}>Discover the best digital goods from top creators, artists and sellers on Solana.</p>
                    </div>
                    <button className={styles.hero_cta}>Explore</button>
                    <p className={styles.hero_stats}>Built for Superteam VN x CandyPay Bounty</p>
                </div>
                <div className={styles.hero_right}>
                    <img src="/hero-graphic.svg" />
                </div>
            </main>
            {onboardingModal && <OnboardingModal setOnboardingModal={setOnboardingModal} />}
        </>
    )
}

export default Hero