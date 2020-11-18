import axios from "axios";
import cookie from "js-cookie";

// account
export const signInUser = async ({
    account_email,
    account_password,
    setRedirect,
    setSignedIn
}) => {
    try {
        await axios.post("/api/account/signin", {
            account_email,
            account_password,
        });
        setSignedIn(true);
        setRedirect(true);
    } catch (e) {
        alert("incorrect password");
    }
};

export const signUpUser = async ({
    first_name,
    last_name,
    account_email,
    account_password,
    setRedirect,
}) => {
    try {
      await axios.post("/api/account/signup", {
            first_name,
            last_name,
            account_email,
            account_password,
        });
        // console.log(data);
        setRedirect(true);
    } catch (err) {
        alert("account id already exists");
        // console.error(err);
    }
};

export const signOutUser = () => {};

// article (first one is REST others is only admin page)
export const fetchArticles = async ({ setArticle }) => {
    try {
        const { data } = await axios.get("/api/article");
        setArticle(data);
    } catch (err) {
        console.error(err);
    }
};

export const masterDeleteArticle = (socket, article_id) => {
    try {
        socket.emit("masterDeleteArticle", { article_id });
    } catch (err) {
        console.error(err.message);
    }
};

export const masterPostArticle = ({
    socket,
    article_title,
    article_image,
    article_image_alt,
    article_post,
}) => {
    try {
        socket.emit("masterPostArticle", {
            article_title,
            article_image,
            article_image_alt,
            article_post,
        });
    } catch (err) {
        alert("article name already exists");
        // console.error(err.message);
    }
};

export const masterUpdateArticle = ({
    socket,
    article_id,
    article_image,
    article_title,
    article_image_alt,
    article_post,
}) => {
    try {
        socket.emit("masterUpdateArticle", {
            article_id,
            article_title,
            article_image,
            article_image_alt,
            article_post,
        });
        // console.log(data);
        alert("updated");
        console.log("success");
    } catch (err) {
        console.log(err);
    }
};

export const fetchArticleById = async ({ articleId, setArticleData }) => {
    try {
        // article fetch for article where articleId is /:articleId
        const { data } = await axios.get(`/api/article/${articleId}`);
        setArticleData(data);
    } catch (err) {
        console.error(err.message);
    }
};

// master
export const signInMaster = async ({
    master_account_email,
    master_account_password,
    setRedirect,
}) => {
    try {
        await axios.post("/api/masteraccount/signin", {
            master_account_email,
            master_account_password,
        });
        setRedirect(true);
    } catch (err) {
        alert("fail");
        console.log(err);
    }
};

// make sure we validate master token to access blog editing
export const validateMasterCookie = async ({ setSignedIn }) => {
    try {
        await axios.get("/api/masteraccount/verify");
    } catch (err) {
        setSignedIn(false);
    }
};

// reviews
export const postReview = ({ webSocket, article_id, review_message }) => {
    try {
        webSocket.emit("postReview", {
            token: cookie.get("jan"),
            article_id: article_id,
            review_message,
        });
    } catch (error) {
        console.error(error);
    }
};
