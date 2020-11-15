import React, { FC, useState } from "react";
import { postReview } from "../utilities/apiCall";

interface Props {
    webSocket: string;
    article_id: number;
}

export const ReviewEntry: FC<Props> = ({ webSocket, article_id }) => {
    const [review_message, setReview_Message] = useState("");

    const handleSubmitComment = (e: any) => {
        e.preventDefault();
        postReview({
            webSocket,
            article_id,
            review_message,
        });
    };

    return (
        <div>
            <b>Comments: </b> <br />
            <form
                className="container-review-form"
                onSubmit={handleSubmitComment}
            >
                <textarea
                    placeholder="Post a comment"
                    onChange={(e) => setReview_Message(e.target.value)}
                    value={review_message}
                ></textarea>
                <button>Submit</button>
            </form>
            <br />
        </div>
    );
};
