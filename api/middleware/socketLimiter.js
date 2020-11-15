const { RateLimiterMemory } = require("rate-limiter-flexible");

// write one comment per 2 seconds
module.exports =  socketLimiter = new RateLimiterMemory({
    points: 1, // 5 points
    duration: 2, // per second
});