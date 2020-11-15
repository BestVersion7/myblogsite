import React from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import { DonationForm } from "../components/donationForm";

// const stripePromise = loadStripe(
//     ""
// );

export const Donation = () => {
    return (
        <main>
            {/* <Elements stripe={stripePromise}> */}
            <DonationForm />
            {/* </Elements> */}
        </main>
    );
};
