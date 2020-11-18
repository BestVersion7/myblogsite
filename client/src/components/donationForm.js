import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            color: "#32325d",
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
        },
    },
};
export const DonationForm = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [email, setEmail] = useState();
    const [amount, setAmount] = useState();

    const [name, setName] = useState();
    const [openModal, setOpenModal] = useState(false);

    // payment intent for redirecting to success page with match.params.id
    const [payIntent, setPayIntent] = useState({});

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        // if stripe is failing
        if (!stripe || !elements) {
            return;
        }
        e.preventDefault();

        // don't double click the Credit cCardF
        setProcessing(true);
        // get the paymentintent secret key
        const { data } = await axios.post("/stripe/createPaymentIntent", {
            name,
            email,
            amount,
        });

        // confirm the card
        const { paymentIntent, error } = await stripe.confirmCardPayment(
            data.clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            }
        );

        if (paymentIntent) {
            setPayIntent(paymentIntent);
            setSucceeded(true);
        }

        if (error) {
            setProcessing(false);
            setOpenModal(true);
        }
    };

    // redirect if succeeded
    if (succeeded) {
        return (
            <Redirect
                to={{
                    pathname: `/donate/success/${payIntent.id}`,
                    state: { payIntent },
                }}
            />
        );
    }

    return (
        <form className="container-donation-form">
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Cardholder's Name"
            />
            <br />
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
            />
            <br /> <br />
            <CardElement options={CARD_OPTIONS} />
            <hr style={{ backgroundColor: "gray" }} />
            <TextField
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label="Amount"
            />
            <br /> <br />
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSubmit}
                disabled={processing || succeeded}
            >
                <span>{processing ? <CircularProgress /> : "Pay"}</span>
            </Button>
            <Modal
                className="modal-donation"
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="modal-donation-message">
                    Wrong Card Number
                    <Button
                        color="secondary"
                        onClick={() => setOpenModal(false)}
                    >
                        X
                    </Button>
                </div>
            </Modal>
        </form>
    );
};
