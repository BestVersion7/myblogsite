import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DonationForm } from "./donationForm";

const stripePromise = loadStripe(
    "pk_test_51HmjKWIvcOSGF1N4YKDQ1tHy9E8uM3EDe8TLs61aMXHZ4ksS5Z5NDnpFIBxg47wp7JrQgwUwfaP3jhjl4dSgEsy600VZ9Xnm6A"
);

export const DonationComp = () => {
    return (
        <div>
            <h3>Support My Website:</h3>
            <Elements stripe={stripePromise}>
                <DonationForm />
            </Elements> <br/>
        </div>
    );
};
