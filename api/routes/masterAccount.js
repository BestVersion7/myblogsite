const express = require("express");
const { signInMaster, verifyMasterRoute, signUpMaster } = require("../controller/masterAccount");
const accountLimiter = require("../middleware/accountLimiter");
const router = express.Router();


router.get('/verify', verifyMasterRoute)
router.post('/signin', accountLimiter, signInMaster)
router.post('/signup', signUpMaster)

module.exports = router