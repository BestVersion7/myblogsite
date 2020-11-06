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
            <h2>Home Vibes</h2>
            <p>
                Welcome to my blog where I write about my personal experience
                with topics such as learning new skillz, passion projects and
                books.
            </p>
            <p>
                A little bit about me is I love to learn and read self-help
                books on web development, dating and business. My goal is to
                share my experiences with you.
            </p>
            <p>Disclaimer: This site uses cookies for Google Analytics.</p>
            <h2>Blog Articles</h2>
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
