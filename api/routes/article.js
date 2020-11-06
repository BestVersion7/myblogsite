const express = require("express");
const { getArticleById, getArticle } = require("../controller/article");
const router = express.Router();

router.get("/:articleId", getArticleById);
router.get("/", getArticle);

module.exports = router;
