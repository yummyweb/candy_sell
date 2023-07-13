import { useSession } from "next-auth/react"
import styles from "../styles/DashboardBody.module.css"
import { useEffect, useState } from "react"
import supabase from "../utils/client";
import ProductCard from "./ProductCard";

function DashboardBody() {
    const { data } = useSession()
    // Stats is an array of three elements, total_sales, products_sold and followers
    const [stats, setStats] = useState([0, 0, 0])
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (data) {
            setStats([
                data.user.total_sales,
                data.user.products_sold,
                data.user.follower_count
            ])
        }
    }, [data])

    useEffect(() => {
        async function fetchProducts() {
            const { data: productData, error } = await supabase
                .from('product')
                .select('*')
                .eq("user", data.user.publicKey)
            
                console.log(productData)

            if (error) {
                alert("Hi, we encountered an error which is most likely an outcome of a bug. Please report this to us on Discord (id: yum#4666) or Email.")
                console.log(error)
            }

            setProducts(productData)
        }

        if (data) {
            fetchProducts()
        }
    }, [data])

    return (
        <>
            <div className={styles.big_numbers}>
                <div className={styles.big_stats}>
                    <h1 className={styles.bold_number}>${stats[0]}</h1>
                    <p className={styles.stat_title}>Total Sales</p>
                </div>
                <div className={styles.big_stats}>
                    <h1 className={styles.bold_number}>{stats[1]}</h1>
                    <p className={styles.stat_title}>Products Sold</p>
                </div>
                <div className={styles.big_stats}>
                    <h1 className={styles.bold_number}>{stats[2]}</h1>
                    <p className={styles.stat_title}>Followers</p>
                </div>
            </div>
            <div className={styles.products_grid}>
                {data && products ? products.map(p => (
                    <ProductCard key={p.id} image={p.img} title={p.name} seller={data.user.username} price={p.price} />
                )) : "Loading..."}
            </div>
        </>
    )
}

export default DashboardBody