const { RateLimiterMemory } = require("rate-limiter-flexible");

// write 1 comment per 2 seconds
module.exports =  socketLimiter = new RateLimiterMemory({
    points: 1, 
    duration: 2
});