import React, { FC } from "react";
import Button from "@material-ui/core/Button";

export const DonationSuccess: FC = ({ history }: any) => {
    // if no history return a static page
    if (history.location.state === undefined) {
        return <div>This page does not exist</div>;
    }
    // console.log(history);
    const {  amount, receipt_email } = history.location.state.payIntent;

    // 4242424242424242
    return (
        <div className="route-donation">
            {`Thank for your donation of $${amount / 100}! A receipt has been
                sent to you at ${receipt_email}`}
            . You can also print this page for your records.
            <Button href="/" variant="contained" color="primary">
                Go Back to Home
            </Button>
        </div>
    );
};
