// UNUSED BECAUSE SocketIO IS USED NOT RESTFUL
// const jwt = require("jsonwebtoken");

// module.exports = verifyMaster = async (req, res, next) => {
//     try {
//         const { master } = req.cookies;
//         const results = await jwt.verify(master, process.env.JWTSECRET);
//         if (!results) {
//             return res.status(500).json("bad request");
//         } else {
//             next();
//         }
//     } catch (err) {
//         res.status(500).send('bad ')
//         // console.error(err.message);
//     }
// };
