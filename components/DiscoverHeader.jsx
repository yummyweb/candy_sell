import styles from "../styles/DiscoverHeader.module.css"

function DiscoverHeader() {
    return (
        <div className={styles.header}>
            <h1>Explore Marketplace</h1>
            <p className={styles.headerDescription}>
                Discover the best digital goods on Solana on our platform.
            </p>
        </div>
    )
}

export default DiscoverHeader