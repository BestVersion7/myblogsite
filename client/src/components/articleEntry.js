import React, { useState } from "react";
import { masterPostArticle } from "../utilities/apiCall";
import {object} from 'prop-types'

export const ArticleEntry = ({ socket }) => {
    const [article_title, setArticle_Title] = useState("");
    const [article_image, setArticle_Image] = useState("");
    const [article_image_alt, setArticle_Image_Alt] = useState("");
    const [article_post, setArticle_Post] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        masterPostArticle({
            socket,
            article_title,
            article_image,
            article_image_alt,
            article_post,
        });
    };

    return (
        <section>
            <h2>Enter article here</h2>
            <form onSubmit={handleSubmit}>
                <label>Article Title</label>
                <textarea
                    onChange={(e) => setArticle_Title(e.target.value)}
                    cols="15"
                    rows="3"
                    value={article_title}
                >
                    {article_title}
                </textarea>

                <label>Article Image</label>
                <textarea
                    cols="15"
                    rows="3"
                    onChange={(e) => setArticle_Image(e.target.value)}
                    value={article_image}
                >
                    {article_image}
                </textarea>

                <label>Article Image Alt Tag</label>
                <textarea
                    cols="15"
                    rows="1"
                    onChange={(e) => setArticle_Image_Alt(e.target.value)}
                    value={article_image_alt}
                >
                    {article_image_alt}
                </textarea>
                <label>Article Post</label>
                <textarea
                    cols="15"
                    rows="5"
                    onChange={(e) => setArticle_Post(e.target.value)}
                    value={article_post}
                >
                    {article_post}
                </textarea>
                <button>Submit</button>
            </form>
        </section>
    );
};

ArticleEntry.propTypes = {
    socket: object
}
