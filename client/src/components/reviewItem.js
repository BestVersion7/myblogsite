import React from "react";
import convertDate from "../utilities/convertDate";
import { string } from "prop-types";

export const ReviewItem = ({
    first_name,
    last_name,
    review_date,
    review_message,
}) => {
    return (
        <div>
            <p>
                <b>
                    {first_name} {last_name}{" "}
                </b>
                {convertDate(review_date)}
            </p>
            <p>{review_message}</p>
        </div>
    );
};

ReviewItem.propTypes = {
    first_name: string.isRequired,
    last_name: string.isRequired,
    review_message: string.isRequired
};
