const {
    signIn,
    signOut,
    signUp,
    fetchAccountByDecodeJWT,
} = require("../controller/account");
const express = require("express");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/signup", signUp);
router.get("/", fetchAccountByDecodeJWT);

module.exports = router;
