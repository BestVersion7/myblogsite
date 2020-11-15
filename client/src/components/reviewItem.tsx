import React, { FC } from "react";
import convertDate from "../utilities/convertDate";

interface Props {
    first_name: string;
    last_name: string;
    review_date: string;
    review_message: string;
}

export const ReviewItem: FC<Props> = ({
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
