import React from "react";
import convertDate from "../utilities/convertDate";
import DangerousHTML from "../utilities/dangerousHTML";
import { string } from "prop-types";

export const ArticleItemArticle = ({
    article_date,
    article_image,
    article_title,
    article_post,
    article_image_alt,
}) => {
    return (
        <article className="container-article-article">
            <h3>{article_title}</h3>
            <p className="container-article-article-author">
                {" "}
                Hunter Fan {convertDate(article_date)}
            </p>
            <figure>
                <img
                    src={article_image}
                    title={article_image_alt}
                    alt={article_image_alt}
                />
                <figcaption>{article_image_alt}</figcaption>
            </figure>
            <DangerousHTML post={article_post} />
        </article>
    );
};

ArticleItemArticle.propTypes = {
    article_date: string,
    article_image: string,
    article_title: string,
    article_post: string,
    article_image_alt: string,
};
