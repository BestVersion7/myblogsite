require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socket(server);
const cors = require("cors");
const accountRouter = require("./api/routes/account");
const reviewRouter = require("./api/routes/review");
const articleRouter = require("./api/routes/article");
const masterAccountRouter = require("./api/routes/masterAccount");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
// const pool = require("./database");
const path = require('path')
const stripeRouter = require('./api/routes/stripe')

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// this is to time the REST api requests
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/account", accountRouter);
app.use("/api/review", reviewRouter);
app.use("/api/article", articleRouter);
app.use("/api/masteraccount", masterAccountRouter);
app.use('/stripe', stripeRouter)

// server static files when in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

const {
    fetchReviews,
    postReview,
    disconnectSocket,
    masterFetchArticle,
    masterPostArticle,
    masterDeleteArticle,
    updateArticleById,
} = require("./api/controller/socket");

//2 namespaces for different views
const nsp = io.of("/user");
const nsp2 = io.of("/master");

// nsp.use(SocketController)
nsp.on("connection", (socket) => {
    console.log("nsp connected");
    fetchReviews(nsp, socket);
    postReview(nsp, socket);
    disconnectSocket(socket);
});

// VERIFY COOKIE for master crud requests
nsp2.use((socket, next) => {
    // verify Cookie
    try {
        const token = socket.handshake.query.token;
        jwt.verify(token, process.env.JWTSECRET);
        next();
    } catch (err) {
        console.log(err);
        return;
    }
}).on("connection", (socket) => {
    // console.log("nsp2 connectd");
    masterFetchArticle(socket);
    masterPostArticle(socket);
    masterDeleteArticle(socket);
    updateArticleById(socket);
    disconnectSocket(socket);
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server running on ${port}`));
