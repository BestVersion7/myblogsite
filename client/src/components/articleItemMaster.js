import React, { useState } from "react";
import { masterUpdateArticle, masterDeleteArticle } from "../utilities/apiCall";
import formatDate from "../utilities/convertDate";
import convertArticleTitle from "../utilities/convertArticleTitle";
import { string, object, number } from "prop-types";

export const ArticleItemMaster = ({
    socket,
    article_title,
    article_id,
    article_date,
    article_image,
    article_image_alt,
    article_post,
}) => {
    const [articleTitle, setArticleTitle] = useState(article_title);
    const [articlePost, setArticlePost] = useState(article_post);
    const [articleImage, setArticleImage] = useState(article_image);
    const [articleImageAlt, setArticleImageAlt] = useState(article_image_alt);

    const handleUpdate = (e) => {
        masterUpdateArticle({
            socket,
            article_id: e.target.value,
            article_image: articleImage,
            article_title: articleTitle,
            article_image_alt: articleImageAlt,
            article_post: articlePost,
        });
    };

    return (
        <article className="container-master-article">
            EDIT HERE <br /> {formatDate(article_date)} <br />
            <a
                href={`/article/${article_id}/${convertArticleTitle(
                    article_title
                )}`}
            >
                Link to Article:
            </a>
            <br />
            Article Title <br />
            <input
                value={article_title}
                onChange={(e) => setArticleTitle(e.target.value)}
            />
            <br />
            Article Image <br />
            <input
                value={article_image}
                onChange={(e) => setArticleImage(e.target.value)}
            />
            <br />
            Article Image Alt <br />
            <input
                value={article_image_alt}
                onChange={(e) => setArticleImageAlt(e.target.value)}
            />
            <br />
            Article Post <br />
            <textarea
                onChange={(e) => setArticlePost(e.target.value)}
                cols="50"
                rows="10"
                value={article_post}
            >
                {article_post}
            </textarea>
            <br />
            <button value={article_id} onClick={handleUpdate}>
                UPDATE CHANGES
            </button>
            <br />
            <button
                value={article_id}
                onClick={(e) => masterDeleteArticle(socket, e.target.value)}
            >
                DELETE ARTICLE id {article_id}
            </button>
        </article>
    );
};
ArticleItemMaster.propTypes = {
    socket: object,
    article_title: string.isRequired,
    article_id: number.isRequired,
    article_date: string.isRequired,
    article_image: string.isRequired,
    article_image_alt: string.isRequired,
    article_post: string.isRequired,
};
