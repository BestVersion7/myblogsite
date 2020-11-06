const express = require("express");
const { getReviewByArticleId, getAllReviews } = require("../controller/review");
const router = express.Router();
// const {verifyCookie} = require('../middleware/verifyCookie')

router.get("/:articleId", getReviewByArticleId);
router.get("/", getAllReviews);
// this is done through socket.io for live chat
// router.post('/:articleId', verifyCookie, postReviewByArticleId)

module.exports = router;
