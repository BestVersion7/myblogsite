import React, { useState, useEffect } from "react";
import { ArticleItemArticle } from "../components/articleItemArticle";
import io from "socket.io-client";
import { ReviewItem } from "../components/reviewItem";
import { ReviewEntry } from "../components/reviewEntry";
import { fetchArticleById } from "../utilities/apiCall";

export const Article = ({ match }) => {
    const [articleData, setArticleData] = useState({});
    const [reviewData, setReviewData] = useState([]);
    const [currentSocket, setCurrentSocket] = useState(null);
    // this is to make sure review can be entered
    const [userSignedIn, setUserSignedIn] = useState(true);

    useEffect(() => {
        let url = "http://localhost:4000";
        if(process.env.NODE_ENV==='development') {
            url=''
        }
        const socket = io.connect(`${url}/user`);
        setCurrentSocket(socket);

        // REST
        fetchArticleById({ articleId: match.params.articleId, setArticleData });

        // SOCKET
        // fetch reviews
        socket.emit("fetchReview", match.params.articleId);
        // console.log("fetching reviews client");
        socket.on("reviews", (data) => {
            setReviewData(data);
        });

        // NO JWT FOR POSTing
        socket.on("noJWT", () => {
            setUserSignedIn(false);
            // alert("maximum charactor 200");
        });

        // post success
        socket.on("postSuccess", () =>
            socket.emit("fetchReview", match.params.articleId)
        );

        //  leave clear session
        return () => {
            socket.disconnect();
        };
    }, [match.params.articleId]);

    const {
        article_date,
        article_image,
        article_post,
        article_title,
    } = articleData;

    return (
        // finds the article based on the id
        <main className="route-article">
            <div>
                <ArticleItemArticle
                    article_id={match.params.articleId}
                    article_date={article_date}
                    article_image={article_image}
                    article_title={article_title}
                    article_post={article_post}
                />

                {/* make sure user has jwt */}
                {userSignedIn ? (
                    <ReviewEntry
                        webSocket={currentSocket}
                        article_id={match.params.articleId}
                    />
                ) : (
                    <div>You must log in to post review</div>
                )}

                {reviewData.map(
                    (
                        { first_name, last_name, review_message, review_date },
                        i
                    ) => {
                        return (
                            <ReviewItem
                                key={i}
                                first_name={first_name}
                                last_name={last_name}
                                review_date={review_date}
                                review_message={review_message}
                            />
                        );
                    }
                )}
            </div>
            <section className="section-article-col2">
                <p>reserved for adsense future update</p>
                <p>reserved for adsense future update</p>
            </section>
        </main>
    );
};
