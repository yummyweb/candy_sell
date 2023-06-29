import { Clipboard, Plus } from "@phosphor-icons/react"
import styles from "../styles/DashboardHeader.module.css"
import Button from "./Button"
import { useEffect, useState } from "react"
import ProductModal from "./ProductModal"
import { Toaster, toast } from "react-hot-toast"
import { useSession } from "next-auth/react"

function DashboardHeader() {
    const [newProductModal, setNewProductModal] = useState(false)
    const [copyLinkText, setCopyLinkText] = useState("Copy Link")
    const { data: sessionData } = useSession()

    const copyProfileLink = () => {
        navigator.clipboard.writeText(window.location.origin + "/@/" + sessionData.user.username).then(function() {
            console.log('Copied profile link to clipboard successfully!')
        })
    }

    return (
        <div className={styles.header}>
            <Toaster />
            <h1 className={styles.title}>Your Dashboard</h1>
            <div className={styles.actions}>
                <Button onClick={() => setNewProductModal(true)} style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Plus style={{
                        marginRight: 10
                    }} weight="bold" size={20} /> New Product
                </Button>

                <Button style={{
                    display: "flex",
                    alignItems: "center"
                }} onClick={() => {
                    copyProfileLink()
                    setCopyLinkText("Copied")
                    setTimeout(() => {
                        setCopyLinkText("Copy Link")
                    }, 2000)
                }}>
                    <Clipboard style={{
                        marginRight: 10
                    }} weight="bold" size={20} /> { copyLinkText }
                </Button>
            </div>
            {newProductModal && <ProductModal setNewProductModal={setNewProductModal} />}
        </div>
    )
}

export default DashboardHeader