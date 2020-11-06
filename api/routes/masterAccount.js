const express = require("express");
const { signInMaster, verifyMasterRoute, signUpMaster } = require("../controller/masterAccount");
const router = express.Router();

router.get('/verify', verifyMasterRoute)
router.post('/signin', signInMaster)
router.post('/signup', signUpMaster)

module.exports = router