const {
    signIn,
    signOut,
    signUp,
    fetchAccountByDecodeJWT,
} = require("../controller/account");
const express = require("express");
const router = express.Router();
const accountLimiter = require('../middleware/accountLimiter')

router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/signup", accountLimiter, signUp);
router.get("/", fetchAccountByDecodeJWT);

module.exports = router;
