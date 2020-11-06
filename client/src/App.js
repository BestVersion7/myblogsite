import React, { useState, useEffect } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Route, Switch } from "react-router-dom";
import { Home } from "./routes/home";
import { SignIn } from "./routes/signin";
import { ErrorPage } from "./routes/errorPage";
import { Donation } from "./routes/donation";
import { Article } from "./routes/article";
import { SignUp } from "./routes/signup";
import { Master } from "./routes/master";
import { MasterView } from "./routes/masterView";
import ProtectedRoute from "./utilities/protectedRoute";
import { AuthContext } from "./utilities/authContext";
import axios from "axios";

const App = () => {
    const [signedIn, setSignedIn] = useState(false);

    // this is to change the navigation to remove signin to signout on refresh
    const validateToken = async () => {
        try {
            await axios.get("/api/account");
            setSignedIn(true);
        } catch (err) {
            console.clear();
        }
    };

    useEffect(() => {
        validateToken();
    }, [signedIn]);

    return (
        <div>
            <AuthContext.Provider value={{ signedIn, setSignedIn }}>
                <Header />
                <div className="container-app">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route
                            path="/article/:articleId/:articleTitle"
                            component={Article}
                        />
                        <Route path="/donate" component={Donation} />
                        <Route path="/master" component={Master} />
                        <ProtectedRoute
                            path="/masterview"
                            component={MasterView}
                        />
                        <Route path="/" component={ErrorPage} />
                    </Switch>
                </div>
                <Footer />
            </AuthContext.Provider>
        </div>
    );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { Switch, Route } from "react-router-dom";
// import axios from "axios";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");

// const Home = ({ match }) => {
//     const [review, setReview] = useState([]);
//     const [reviewEntry, setReviewEntry] = useState("432");
//     const [userCount, setUserCount] = useState(0);
//     const [articles, setArticles] = useState([]);

//     useEffect(() => {
//         // fetch Articles REST
//         const fetchArticles = async () => {
//             try {
//                 const { data } = await axios.get("/api/article");
//                 // console.log(data);
//                 setArticles(data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchArticles();

//         // SOCKETS
//         socket.on("connection", console.log("client connect"));

//         // join room
//         socket.emit("joinRoom", match.params.id);
//         socket.on("countUsers", (data) => {
//             setUserCount(data);
//         });
//         // console.log(match.params.id);
//         // socket.emit("joinRoom");
//         // socket.on("countUsers", (data) => {
//         //     console.log(`client ${data}`);
//         //     setUserCount(data);
//         // });

//         // FETCH THE REVIEWS
//         socket.emit("fetchReview");
//         socket.on("reviews", (data) => {
//             setReview(data);
//         });

//         // update review after update
//         socket.on("postSuccess", () => socket.emit("fetchReview"));
//     }, [match.params.id]);

//     const handleSubmitEntry = (e) => {
//         e.preventDefault();

//         socket.emit("postReview", {
//             article_id: 1,
//             review_message: reviewEntry,
//         });
//     };
//     return (
//         <main>
//             articles <br />
//             {articles.map(({ article_id, article_title }) => {
//                 return <div key={article_id}>{article_title}</div>;
//             })}
//             reviews <br />
//             <form onSubmit={handleSubmitEntry}>
//                 <textarea
//                     onChange={(e) => setReviewEntry(e.target.value)}
//                     value={reviewEntry}
//                 />
//                 <button>submit</button>
//                 <h2>{userCount}</h2>
//             </form>
//             {review.map(({ article_id, review_message }, i) => {
//                 return (
//                     <Reviews
//                         key={i}
//                         article_id={article_id}
//                         review_message={review_message}
//                     />
//                 );
//             })}
//         </main>
//     );
// };

// const Reviews = ({ article_id, review_message }) => {
//     return (
//         <div>
//             <h3>ArticleID: {article_id}</h3>
//             <p>ReviewMessage: {review_message}</p>
//         </div>
//     );
// };

// const Hello = () => {
//     return <main>this is main</main>;
// };

// const App = () => {
//     return (
//         <div>
//             <Switch>
//                 <Route path="/" exact component={Hello} />
//                 <Route path="/:id" component={Home} />
//             </Switch>
//         </div>
//     );
// };

// export default App;
