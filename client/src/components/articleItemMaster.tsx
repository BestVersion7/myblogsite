import React, { useState, FC } from "react";
import { masterUpdateArticle, masterDeleteArticle } from "../utilities/apiCall";
import formatDate from "../utilities/convertDate";
import convertArticleTitle from "../utilities/convertArticleTitle";

interface Props {
    socket: string;
    article_title: string;
    article_id: number;
    article_date: string;
    article_image: string;
    article_image_alt: string;
    article_post: string;
}

export const ArticleItemMaster: FC<Props> = ({
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

    const handleUpdate = (e: any) => {
        masterUpdateArticle({
            socket,
            article_id: e.target.value,
            article_image: articleImage,
            article_title: articleTitle,
            article_image_alt: articleImageAlt,
            article_post: articlePost,
        });
    };

    // this needs to be rewritten to update socket changes on update
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
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
            />
            <br />
            Article Image <br />
            <input
                value={articleImage}
                onChange={(e) => setArticleImage(e.target.value)}
            />
            <br />
            Article Image Alt <br />
            <input
                value={articleImageAlt}
                onChange={(e) => setArticleImageAlt(e.target.value)}
            />
            <br />
            Article Post <br />
            <textarea
                onChange={(e) => setArticlePost(e.target.value)}
                cols={50}
                rows={10}
                value={articlePost}
            />
            <br />
            <button value={article_id} onClick={handleUpdate}>
                UPDATE CHANGES
            </button>
            <br />
            <button
                value={article_id}
                onClick={(e: any) => masterDeleteArticle(socket, e.target.value)}
            >
                DELETE ARTICLE id {article_id}
            </button>
        </article>
    );
};
