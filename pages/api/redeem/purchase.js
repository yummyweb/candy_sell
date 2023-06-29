import Email, { PurchaseTemplate } from "../../../emails";
import supabase from "../../../utils/client";
import { Resend } from "resend";

export default async function redeemPurchase(req, res) {
    try {
        const { data, _ } = await supabase
            .from("transaction")
            .select("*")
            .eq("tx_id", req.body.txId)

        await supabase
            .from("transaction")
            .update({ success: true })
            .eq("tx_id", req.body.txId)

        if (data[0].candypay_sessionid !== null) {
            const { data: productData, error } = await supabase
                .from("product")
                .select("*")
                .eq("id", data[0].product)
            
            if (error) {
                console.log(error)
            }

            const { data: userData, error: userError } = await supabase
                .from("user")
                .select("*")
                .eq("public_key", productData[0].user)

            if (userError) {
                console.log(userError)
            }

            await supabase
                .from("user")
                .update({ total_sales: userData[0].total_sales + productData[0].price, products_sold: userData[0].products_sold + 1 })
                .eq("public_key", productData[0].user)

            const resend = new Resend(process.env.RESEND_API_KEY)

            resend.emails.send({
                from: 'Purchases <onboarding@resend.dev>',
                to: 'antriksh.timepass@gmail.com',
                subject: 'Your Purchase from candy_sell',
                react: Email({ tx_id: req.body.txId, purchase_link: productData[0].document })
            })
        }

        return res.status(200).json({
            success: true,
            error: null
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error redeeming purchase",
        })
    }
}