import ProductCard from "./ProductCard"
import styles from "../styles/UserProducts.module.css"
import { useEffect, useState } from "react"
import supabase from "../utils/client"

function UserProducts({ username, publicKey }) {
    const [userProducts, setUserProducts] = useState([])

    useEffect(() => {
        async function fetchUserProducts() {
            if (publicKey) {
                const { data, error } = await supabase
                    .from("product")
                    .select("*")
                    .eq("user", publicKey)
                
                if (error) {
                    alert("Hi, we encountered an error which is most likely an outcome of a bug. Please report this to us on Discord (id: yum#4666) or Email.")
                    console.log(error)
                }
                else {
                    setUserProducts(data)
                }
            }
        }

        fetchUserProducts()
    }, [publicKey])

    return (
        <div className={styles.products_list}>
            {username ? userProducts.map(p => (
                <ProductCard withPayButton key={p.id} productId={p.id} seller_address={p.user} filetype={p.filetype} title={p.name} seller={username} price={p.price} image={p.img} />
            )) : null}
        </div>
    )
}

export default UserProducts