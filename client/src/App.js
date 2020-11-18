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
import { DonationSuccess } from "./routes/donationSuccess";
import axios from "axios";
import cookie from "js-cookie";

const App = () => {
    const [signedIn, setSignedIn] = useState(false);

    // this is to change the navigation to remove signin to signout on refresh
    const validateToken = async () => {
        if (!cookie.get("jan")) return;
        try {
            await axios.get("/api/account");
            setSignedIn(true);
        } catch (err) {
            alert('internal system error')
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
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/signin">
                            <SignIn />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <Route path="/article/:articleId/:articleTitle" component={Article}/>
                        <Route
                            path="/donate/success/:id"
                            component={DonationSuccess}
                        />
                        <Route path="/donate">
                            <Donation />
                        </Route>
                        <Route path="/master">
                            <Master />
                        </Route>
                        <ProtectedRoute
                            path="/masterview"
                            component={MasterView}
                        />
                        <Route path="/">
                            <ErrorPage />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </AuthContext.Provider>
        </div>
    );
};

export default App;
