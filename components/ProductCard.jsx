import { useSession } from "next-auth/react"
import styles from "../styles/ProductCard.module.css"
import Button from "./Button"
import { useRouter } from "next/router"
import axios from "axios"
import uuid from "react-uuid"
import supabase from "../utils/client"
import { useState } from "react"

function ProductCard({ title, productId, seller_address, price, image, seller, filetype, withPayButton }) {
    const [loading, setLoading] = useState(false)
    const { data: sessionData } = useSession()
    const router = useRouter()

    const buyProduct = async () => {
        setLoading(true)
        
        const { data: userData, __ } = await supabase
            .from("user")
            .select("*")
            .eq("public_key", seller_address)

        const txId = uuid()

        const response = await axios.post("/api/payment/create-session", {
            product_name: title,
            product_img: image,
            product_filetype: filetype,
            buyer_name: sessionData.user.username,
            payment_amount: price,
            payment_id: txId,
            seller_sales: userData[0].total_sales,
            products_sold: userData[0].products_sold,
            seller_username: seller,
            seller_address
        })

        const data = response.data

        const { data: txData, error } = await supabase
            .from("transaction")
            .insert({ amount: price, success: false, tx_id: txId, product: productId, buyer: sessionData.user.publicKey, candypay_sessionid: data.session_id })

        if (error) {
            console.log(error)
        }
        else {
            router.push(data.payment_url)
        }
    }

    return (
        <div className={styles.card_wrapper}>
            <div className={styles.card}>
                <h1 className={styles.card_title}>{title}</h1>
                <img src={image} alt="Product image" />
                <div className={styles.card_details}>
                    <div className={styles.card_price_wrapper}>
                        <p>Price</p>
                        <h3 className={styles.card_price}>${price}</h3>
                    </div>
                    {!withPayButton ? <div className={styles.card_seller_wrapper}>
                        <p>By</p>
                        <h3 className={styles.card_seller}>@{seller}</h3>
                    </div> : <button onClick={() => buyProduct()} className={styles.pay_button} style={{
                        cursor: loading ? "not-allowed" : "pointer"
                    }}>{loading ? <div className={styles.loader}></div> : "Buy Now"}</button>}
                </div>
            </div>
        </div>
    )
}

export default ProductCard