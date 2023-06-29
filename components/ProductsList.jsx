import ProductCard from "./ProductCard"
import styles from "../styles/ProductsList.module.css"
import { useEffect, useState } from "react"
import supabase from "../utils/client"

function ProductsList() {
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        async function fetchAllProducts() {
            const { data, error } = await supabase
                .from("product")
                .select("*")

            if (error) {
                alert("Hi, we encountered an error which is most likely an outcome of a bug. Please report this to us on Discord (id: yum#4666) or Email.")
                console.log(error)
            }
            else {
                let tempList = []
                for (let i = 0; i < data.length; i++) {
                    const prod = data[i]
                    const { data: userData, _ } = await supabase
                        .from("user")
                        .select("username")
                        .eq("public_key", prod.user)
                    
                    tempList.push({
                        ...prod,
                        seller_username: userData[0].username
                    })
                }
                console.log(tempList)
                setProductsList(tempList)
            }
        }

        fetchAllProducts()
    }, [])

    return (
        <div className={styles.products_list}>
            {productsList.map(p => (
                <ProductCard key={p.id} productId={p.id} seller={p.seller_username} filetype={p.filetype} title={p.name} price={p.price} image={p.img} />
            ))}
        </div>
    )
}

export default ProductsList