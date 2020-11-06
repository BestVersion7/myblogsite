import React, { useState, useEffect } from "react";
import { ArticleItemHome } from "../components/articleItemHome";
import { DonationForm } from "../components/donationForm";
import { fetchArticles } from "../utilities/apiCall";

export const Home = () => {
    const [article, setArticle] = useState([]);
    useEffect(() => {
        fetchArticles({ setArticle });
    }, []);

    return (
        <div className="route-home">
            <h2>At Home Blogs</h2>
            <p>
                Welcome to my blog where I write opinionated articles on
                philosophy, passion projects and people.
            </p>
            <p>
                <b>About the Author: Hunter Fan</b> is a high achiever with a
                background in finance. In his free time, he loves to learn and
                read self-help books on topics in technology, business and
                dating. My goal is to share my experiences with you.
            </p>
            <p>Privacy Policy: This site uses cookies for Google Analytics.</p>
            <h3>Blog Articles</h3>
            <main className="container-article">
                {article.map(
                    ({
                        article_id,
                        article_image,
                        article_title,
                        article_image_alt,
                    }) => (
                        <ArticleItemHome
                            key={article_id}
                            article_id={article_id}
                            article_image={article_image}
                            article_title={article_title}
                            article_image_alt={article_image_alt}
                        />
                    )
                )}
            </main>
            <DonationForm />
        </div>
    );
};
