import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DonationForm } from "../components/donationForm";

const stripePromise = loadStripe(
    "pk_test_51HmjKWIvcOSGF1N4YKDQ1tHy9E8uM3EDe8TLs61aMXHZ4ksS5Z5NDnpFIBxg47wp7JrQgwUwfaP3jhjl4dSgEsy600VZ9Xnm6A"
);

export const Donation = () => {
    return (
        <div className="route-donation">
            <Elements stripe={stripePromise}>
                <DonationForm />
            </Elements>
        </div>
    );
};
