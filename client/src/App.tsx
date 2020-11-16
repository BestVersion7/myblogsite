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