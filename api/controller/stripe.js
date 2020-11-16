const stripe = require("stripe")(process.env.stripeSecretKey);

exports.createPaymentIntent = async (req, res) => {
    try {
        // create a user first (not splitting up in two routes because people don't like creating new accounts)
        const { name, email, amount } = req.body;
        const createUser = await stripe.customers.create({
            name,
            email,
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            description: "Donation to Hunter Fan",
            receipt_email: email,
            customer: createUser.id,
        });

        // sends client secret to front end to complete trx
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).send("interenal error");
    }
}