import React from "react";
import { string } from "prop-types";
import convertArticleTitle from "../utilities/convertArticleTitle";

export const ArticleItemHome = ({
    article_id,
    article_image,
    article_title,
    article_image_alt,
}) => {
    return (
        <article className="container-article-home">
            <a
                className="container-article-home-link"
                href={`/article/${article_id}/${convertArticleTitle(
                    article_title
                )}`}
            >
                <img
                    className="container-article-home-image"
                    src={article_image}
                    title={article_image_alt}
                    alt={article_image_alt}
                />
                {article_title}
            </a>
        </article>
    );
};

ArticleItemHome.propTypes = {
    article_image: string.isRequired,
    article_title: string.isRequired,
};
