const express = require("express");
const { createPaymentIntent } = require("../controller/stripe");
const router = express.Router();

router.post("/createPaymentIntent", createPaymentIntent);

module.exports = router