const pool = require("../../database");

exports.getArticle = async (req, res) => {
    try {
        const articles = await pool.query(
            "SELECT * FROM article ORDER BY article_date DESC;"
        );
        res.json(articles.rows);
    } catch (error) {
        console.log(error);
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const { articleId } = req.params;
        const article = await pool.query(
            "SELECT * FROM article WHERE article_id = $1;",
            [articleId]
        );
        if (article.rowCount == 0) {
            return res.status(400).json("no article");
        } else {
            return res.send(article.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
    }
};

