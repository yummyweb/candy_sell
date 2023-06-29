import { useState } from "react";
import styles from "../styles/ProductModal.module.css"
import Button from "./Button"
import { UploadSimple, X } from "@phosphor-icons/react";
import supabase from "../utils/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSession } from "next-auth/react";
import uuid from 'react-uuid';
import { Toaster, toast } from "react-hot-toast";

function ProductModal({ setNewProductModal }) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [coverImgUrl, setCoverImgUrl] = useState("")
    const [coverImg, setCoverImg] = useState(null)
    const [mainDoc, setMainDoc] = useState(null)
    const [loading, setLoading] = useState(false)
    const { data } = useSession()

    const createProduct = async () => {
        if (name !== "" && price !== null && coverImg && mainDoc) {
            setLoading(true)

            const { data: imgData, error } = await supabase
                .storage
                .from('cover-images')
                .upload(uuid() + coverImg.name.split('.').pop(), coverImg, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) {
                alert("Hi, we encountered an error which is most likely an outcome of a bug. Please report this to us on Discord (id: yum#4666) or Email.")
                console.log(error)
            }

            setCoverImgUrl("https://mhecorawfcniksqvxtmb.supabase.co/storage/v1/object/public/cover-images/" + imgData.path)

            const { data: docData, error: docError } = await supabase
                .storage
                .from('main-docs')
                .upload(uuid() + mainDoc.name.split('.').pop(), mainDoc, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (docError) {
                alert("Hi, we encountered an error which is most likely an outcome of a bug. Please report this to us on Discord (id: yum#4666) or Email.")
                console.log(error)
            }

            const { data: dbData, error: dbError } = await supabase
                .from('product')
                .insert([
                    { name, price, document: "https://mhecorawfcniksqvxtmb.supabase.co/storage/v1/object/public/main-docs/" + docData.path, filetype: mainDoc.type, img: "https://mhecorawfcniksqvxtmb.supabase.co/storage/v1/object/public/cover-images/" + imgData.path, user: data.user.publicKey },
                ])

            if (dbError) {
                alert("Hi, we encountered an error which is most likely an outcome of a bug. Please report this to us on Discord (id: yum#4666) or Email.")
                console.log(error)
            }

            toast.success('Product successfully created!')
            setNewProductModal(false)
        }
        else {
            toast.error("Please enter all fields")
        }
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_header}>
                <h2>New Product</h2>
                <button onClick={() => setNewProductModal(false)} className={styles.modal_close}>
                    <X className={styles.modal_icon} size={20} weight="bold" />
                </button>
            </div>
            <div class={styles.modal_body}>
                <div className={styles.modal_questions}>
                    <p className={styles.modal_question}>What do you call it?</p>
                    <input value={name} placeholder="Enter name" onChange={e => setName(e.target.value)} className={styles.modal_answer} />
                    <p className={styles.modal_question}>How much is it for?</p>
                    <input value={price} type="number" placeholder="Enter price" onChange={e => setPrice(parseInt(e.target.value))} className={styles.modal_answer} />
                    <p className={styles.modal_question}>Upload a cover pic for it</p>
                    <div className={styles.modal_upload_btn_wrapper}>
                        <button className={styles.modal_upload_btn}>
                            <UploadSimple style={{ marginRight: 10 }} weight="bold" size={22} />
                            {coverImg ? (
                                coverImg.name.length > 20 ? coverImg.name.substring(0, 12) + "..." + coverImg.name.split('.').pop() : coverImg.name
                            ) : "Upload File"}
                        </button>
                        <input accept="image/*" onChange={e => setCoverImg(e.target.files[0])} type="file" className={styles.modal_answer_img} />
                    </div>
                    <p className={styles.modal_question}>Also upload the main doc</p>
                    <div className={styles.modal_upload_btn_wrapper}>
                        <button className={styles.modal_upload_btn}>
                            <UploadSimple style={{ marginRight: 10 }} weight="bold" size={22} />
                            {mainDoc ? (
                                mainDoc.name.length > 20 ? mainDoc.name.substring(0, 12) + "..." + mainDoc.name.split('.').pop() : mainDoc.name
                            ) : "Upload File"}
                        </button>
                        <input onChange={e => setMainDoc(e.target.files[0])} type="file" className={styles.modal_answer_img} />
                    </div>
                </div>
            </div>
            <div className={styles.modal_actions}>
                <Button isLoading={loading} onClick={() => createProduct()}>Create</Button>
            </div>
        </div>
    )
}

export default ProductModal