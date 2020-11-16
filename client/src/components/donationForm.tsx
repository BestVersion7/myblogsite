import React, { FC, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Redirect } from "react-router-dom";

// const CARD_OPTIONS = {
//     iconStyle: "solid",
//     style: {
//         base: {
//             iconColor: "#c4f0ff",
//             color: "#fff",
//             fontWeight: 500,
//             fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//             fontSize: "16px",
//             fontSmoothing: "antialiased",
//             ":-webkit-autofill": { color: "#fce883" },
//             "::placeholder": { color: "#87bbfd" },
//         },
//         invalid: {
//             iconColor: "#ffc7ee",
//             color: "#ffc7ee",
//         },
//     },
// };
export const DonationForm: FC = () => {
    const [succeeded, setSucceeded] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("jacklesnaR@yahoo.com");
    const [amount, setAmount] = useState<number | string>(1);

    const [firstName, setFirstName] = useState("fre");
    const [lastName, setLastName] = useState("bre");

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: any) => {
        // if stripe is failing
        if (!stripe || !elements) {
            return;
        }
        e.preventDefault();

        // don't double click the Credit cCardF
        setProcessing(true);
        // get the paymentintent secret key
        const { data } = await axios.post("/stripe/createPaymentIntent", {
            name: `${firstName} ${lastName}`,
            email,
            amount,
        });

        // confirm the card
        const { paymentIntent, error } = await stripe.confirmCardPayment(
            data.clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            }
        );

        if (paymentIntent) {
            setSucceeded(true);
        }
        if (error) {
            setProcessing(false);
            alert(error.message);
        }
    };

    return (
        <form className="container-donation-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CardElement />
            <label> donation amount </label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button disabled={processing || succeeded}>
                <span>{processing ? <div></div> : "Pay"}</span>
            </button>
            {succeeded ? <Redirect to="/" /> : <div>fail</div>}
        </form>
    );
};
