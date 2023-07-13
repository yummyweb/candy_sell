import { useState } from "react";
import styles from "../styles/OnboardingModal.module.css"
import Button from "./Button"
import { X } from "@phosphor-icons/react";
import supabase from "../utils/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSession } from "next-auth/react";

function OnboardingModal({ setOnboardingModal, publicKey }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isSeller, setIsSeller] = useState(false)
    const { data } = useSession()

    const updateInfo = async () => {
        const { _, error } = await supabase
            .from('user')
            .update({ username: name, is_seller: isSeller, email })
            .eq('public_key', data.user.publicKey)

        if (error) {
            alert("Hi, we encountered an error which is most likely an outcome of a bug. Please report this to us on Discord (id: yum#4666) or Email.")
            console.log(error)
        }

        setOnboardingModal(false)
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_header}>
                <h2>Getting Started</h2>
                <button onClick={() => setOnboardingModal(false)} className={styles.modal_close}>
                    <X className={styles.modal_icon} size={20} weight="bold" />
                </button>
            </div>
            <div class={styles.modal_body}>
                <div className={styles.modal_questions}>
                    <p className={styles.modal_question}>What do we call you?</p>
                    <div className={styles.modal_name}>
                        <span className={styles.modal_label}>@</span>
                        <input value={name} placeholder="Enter username" onChange={e => setName(e.target.value)} className={styles.modal_answer} />
                    </div>
                    <p className={styles.modal_question}>How do we contact you?</p>
                    <div className={styles.modal_name}>
                        <input value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} className={styles.modal_answer} />
                    </div>
                    <div className={styles.modal_checkbox_container}>
                        <label htmlFor="checkbox" className={styles.modal_question_seller}>Are you a seller?</label>
                        <input id="checkbox" value={isSeller} onChange={e => setIsSeller(e.target.checked)} type="checkbox" className={styles.modal_answer_checkbox} />
                    </div>
                </div>
            </div>
            <div className={styles.modal_actions}>
                <Button onClick={() => updateInfo()}>Let&apos;s Go</Button>
            </div>
        </div>
    )
}

export default OnboardingModal