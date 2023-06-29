import { Bell, BellRinging, BellSimple, Clipboard, Plus } from "@phosphor-icons/react"
import styles from "../styles/ProfileHeader.module.css"
import Button from "./Button"
import { useEffect, useState } from "react"

function ProfileHeader({ username }) {
    const [newProductModal, setNewProductModal] = useState(false)
    const [followText, setFollowText] = useState("Follow")

    return (
        <div className={styles.header}>
            <h1>@{username}'s Market</h1>
            <Button onClick={() => {
                setFollowText("Followed")
                setTimeout(() => setFollowText("Follow"), 2000)
            }}>
                {followText === "Follow" ? 
                <Bell style={{
                    marginRight: 10
                }} weight="bold" size={20} /> : 
                <BellRinging style={{
                    marginRight: 10
                }} weight="bold" size={20} />}
                {followText}
            </Button>
        </div>
    )
}

export default ProfileHeader