import { CandyPay } from "@candypay/checkout-sdk";

const sdk = new CandyPay({
    api_keys: {
        private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY,
        public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY,
    },
    network: "devnet", // use 'mainnet' for prod and 'devnet' for dev environment
    config: {
        collect_shipping_address: false,
    },
})

export default async function createSession(req, res) {
    try {
        const response = await sdk.session.create({
            success_url: `${process.env.STATIC_URL}/payment/success/${req.body.payment_id}`,
            cancel_url: `${process.env.STATIC_URL}/payment/cancel`,
            // additional SPL tokens, SOL and USDC are the supported tokens by default
            tokens: ["dust", "samo"],
            items: [
                {
                    name: req.body.product_name,
                    // price in USD
                    price: req.body.payment_amount,
                    image: req.body.product_img,
                    quantity: 1,
                    // optional filetype parameter
                    fileType: req.body.product_filetype,
                },
            ],
            metadata: {
                customer_name: req.body.buyer_name,
                seller_username: req.body.seller_username, 
            },
            custom_data: {
                name: req.body.seller_username,
                image: "https://i.ibb.co/chtf9qc/2691.png",
                wallet_address: req.body.seller_address
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating session",
        })
    }
}