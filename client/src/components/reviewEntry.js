import React, { useState } from "react";
import { postReview } from "../utilities/apiCall";
import {string} from 'prop-types'

export const ReviewEntry = ({ webSocket, article_id }) => {
    const [review_message, setReview_Message] = useState("");

    const handleSubmitComment = (e) => {
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

ReviewEntry.propTypes = {
    article_id: string.isRequired
}