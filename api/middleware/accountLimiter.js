const rateLimit = require('express-rate-limit')

module.exports = accountLimiter = rateLimit({
    windowMs: 15* 60 * 1000, //15 minutes
    max: 2,
    message: "2 maximum accounts per 15 minutes per IP address"
})

