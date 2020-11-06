import React, { useState, useEffect } from "react";
import { ArticleEntry } from "../components/articleEntry";
import io from "socket.io-client";
import { ArticleItemMaster } from "../components/articleItemMaster";
import cookie from "js-cookie";

export const MasterView = () => {
    const [masterWebSocket, setMasterWebSocket] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        let url = "http://localhost:4000";
        if (process.env.NODE_ENV === "production") {
            url = "";
        }
        const socket = io.connect(`${url}/master`, {
            query: { token: cookie.get("master") },
        });
        setMasterWebSocket(socket);

        // fetch
        socket.emit("masterFetchArticle");

        // fetch success
        socket.on("articles", (data) => setArticles(data));
        socket.on("masterUpdateSuccess", () =>
            socket.emit("masterFetchArticle")
        );
        socket.on("masterPostSuccess", () => socket.emit("masterFetchArticle"));
        socket.on("masterDeleteSuccess", () =>
            socket.emit("masterFetchArticle")
        );

        //  fail error handlers
        socket.on("masterFetchFail", () => alert("fetch failed"));
        socket.on("masterUpdateFail", () => alert("update failed"));
        socket.on("masterPostFail", () => alert("post unsuccess"));
        socket.on("masterDeleteFail", () => alert("delet unsuccess"));
    }, []);

    return (
        <div className="route-masterView">
            <ArticleEntry socket={masterWebSocket} />
            {articles.map(
                (
                    {
                        article_id,
                        article_date,
                        article_image,
                        article_title,
                        article_image_alt,
                        article_post,
                    },
                    i
                ) => (
                    <ArticleItemMaster
                        key={i}
                        socket={masterWebSocket}
                        article_id={article_id}
                        article_title={article_title}
                        article_date={article_date}
                        article_image={article_image}
                        article_image_alt={article_image_alt}
                        article_post={article_post}
                    />
                )
            )}
        </div>
    );
};
