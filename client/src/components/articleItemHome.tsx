import React, { FC } from "react";
import convertArticleTitle from "../utilities/convertArticleTitle";

interface Props {
    article_id: number;
    article_image: string;
    article_title: string;
    article_image_alt: string;
}

export const ArticleItemHome: FC<Props> = ({
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
