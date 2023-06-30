# candy_sell

## What is it

Coinsense is a whimsical wallet analyzer that takes a fun and creative approach at your crypto portfolio and past transactions. With a simple and clear UI/UX, our aim is for you to know gain more insights into your own transaction history on a "degen" scale. You can watch the demo video for candy_sell, [here]()

## Technologies Used

- **Next.js:** We used Next.js (and React.js) for the frontend user interface due to the ease-of-use in development and performance of React.js. With Next.js, we were able to render pages on server-side and implement basic API routes.

- **CandyPay:** We used CandyPay for working with payments and allowing users to buy digital products with different SPL tokens, in addition to SOL. Our experience using CandyPay was more than pleasant, with their developer-friendly API and documentation, implementing payments was more than simple. We used CandyPay's Checkout SDK, with their `checkout-sdk` npm package.

- **Supabase:** In order to add storage and persistance to our application, we used Supabase. Supabase is an easy-to-use cloud database layer on top of PostgreSQL. The main reason we used Supabase was that it was very easy to get up and running with as compared to other serverless databases, and their services were also free. On top of that, they provided free storage for files and images. So all seller documents/digital goods were stored in the storage bucket.

- **Resend Labs:** We needed to send documents to the buyer via email, since that was the most optimal user experience we could think of. Emails are easy to access, and the user automatically gets sent the document on payment, which means they would not be required to needlessly interact with the dashboard to find the document. To send emails, we tried Resend Labs. It took us sometime to set up Resend Labs' API, but after that it was smooth sailing. With their API, we could declare an email in React.js, which was the best option for us.

## Future Plans

- Improve document download email template
- Implementing tags and categories for products
- Better user interface and user experience based on feedback testing
- Better analytics and logs in seller dashboard (maybe logs for each purchase and who bought it)
- Be able to change quantity of products and buy more than one product at a time

*Built by Antariksh Verma (https://twitter.com/AntarikshaVerm2)*