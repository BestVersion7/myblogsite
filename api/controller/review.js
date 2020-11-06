const pool = require("../../database");
const jwt = require("jsonwebtoken");

exports.getAllReviews = async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM review;")
        res.json(data.rows)
    } catch(err){
        res.status(404).json('not found')
    }
}
exports.getReviewByArticleId = async (req, res) => {
    try {
        const { articleId } = req.params;
        const review = await pool.query(
            "SELECT * FROM review WHERE article_id = $1 ORDER BY review_date DESC ",
            [articleId]
        );
        res.send(review.rows);
    } catch (err) {
        res.status(404).json('not found')
        console.error(err.message);
    }
};

exports.postReviewByArticleId = async (req, res) => {
    try {
        const { jan } = req.cookies;
        // account id is inside jwt token
        const { account_id } = jwt.decode(jan);
        // :articleId
        const { articleId } = req.params;
        const { review_message } = req.body;
        // console.log(req.params)
        // console.log(account_id, articleId, review_message)
        const reviewMessage = await pool.query(
            "INSERT INTO review(article_id, review_message, account_id) VALUES ($1, $2, $3) RETURNING *;",
            [articleId, review_message, account_id]
        );
        res.json(reviewMessage.rows);
    } catch (error) {
        console.log(error.message);
    }
};
