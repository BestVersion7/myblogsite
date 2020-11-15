const jwt = require("jsonwebtoken");
const pool = require("../../database");
const socketLimiter = require("../middleware/socketLimiter");

exports.fetchReviews = (endpoint, socket) => {
    socket.on("fetchReview", async (room) => {
        try {
            socket.join(room);
            // console.log(room);

            // join the review and account table on account_id
            const data = await pool.query(
                "SELECT review.article_id, review.review_date, review.review_message, account.first_name, account.last_name FROM review JOIN account ON review.account_id = account.account_id WHERE review.article_id = $1 ORDER BY review.review_date DESC LIMIT 25;",
                [room]
            );
            // console.log(data.rows);
            endpoint.to(room).emit("reviews", data.rows);
        } catch (error) {
            console.error(error);
        }
    });
};

// post review
exports.postReview = (endpoint, socket) =>
    socket.on("postReview", async (data) => {
        try {
            // limit number of posts per user
            await socketLimiter.consume(socket.handshake.address);

            //verify the cookie and extract the account_id
            const { account_id } = jwt.verify(
                data.token,
                process.env.JWTSECRET
            );

            // the room number is article_id
            await pool.query(
                "INSERT INTO review (article_id, account_id, review_message) VALUES ($1, $2, $3) RETURNING *",
                [data.article_id, account_id, data.review_message]
            );
            // console.log(data1.rows);
            // the room number is article_id
            endpoint.to(data.article_id).emit("postSuccess");
        } catch (error) {
            console.error(error.message);
            socket.emit("noJWT");
        }
    });

// disconnect
exports.disconnectSocket = (socket) =>
    socket.on("disconnect", () => console.log("disconnec server"));

// MASTER
// jwt.verify(data.token, process.env.JWTSECRET);

// masterView fetch Articles
exports.masterFetchArticle = (socket) => {
    socket.on("masterFetchArticle", async () => {
        try {
            const articles = await pool.query(
                "SELECT * FROM article ORDER BY article_date DESC "
            );
            // console.log(articles)
            socket.emit("articles", articles.rows);
        } catch (error) {
            console.error(error.message);
            socket.emit("masterFetchFail");
        }
    });
};
// masterView post articles
exports.masterPostArticle = (socket) => {
    socket.on("masterPostArticle", async (data) => {
        try {
            const {
                article_title,
                article_image,
                article_image_alt,
                article_post,
            } = data;
            await pool.query(
                "INSERT INTO article(article_title, article_image, article_image_alt, article_post) VALUES ($1, $2, $3, $4) RETURNING *;",
                [article_title, article_image, article_image_alt, article_post]
            );
            socket.emit("masterPostSuccess");
        } catch (error) {
            console.error(error.message);
            socket.emit("masterPostFail");
        }
    });
};
// masterView delete articleById
exports.masterDeleteArticle = (socket) => {
    socket.on("masterDeleteArticle", async (data) => {
        try {
            await pool.query(
                "DELETE FROM article WHERE article_id = $1 RETURNING *",
                [data.article_id]
            );
            socket.emit("masterDeleteSuccess");
        } catch (err) {
            console.error(err.message);
            socket.emit("masterDeleteFail");
        }
    });
};

// update article
exports.updateArticleById = (socket) => {
    socket.on("masterUpdateArticle", async (data) => {
        const {
            article_id,
            article_image,
            article_title,
            article_image_alt,
            article_post,
        } = data;
        try {
            await pool.query(
                "UPDATE article SET article_image = $1, article_title=$2, article_image_alt=$3, article_post=$4 WHERE article_id = $5 RETURNING *;",
                [
                    article_image,
                    article_title,
                    article_image_alt,
                    article_post,
                    article_id,
                ]
            );
            socket.emit("masterUpdateSuccess");
        } catch (err) {
            console.error(err.message);
            socket.emit("masterUpdateFail");
        }
    });
};
