import React, { useState } from "react";
import { signInMaster } from "../utilities/apiCall";
import { Redirect } from "react-router-dom";
import imgmaster from "../assets/masterview.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const Master = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const handleSignIn = (e: any) => {
        e.preventDefault();
        signInMaster({
            master_account_email: email,
            master_account_password: password,
            setRedirect,
        });
    };
    if (redirect) {
        return <Redirect to="/masterview" />;
    }
    return (
        <div className="route-master">
            <p>
                Sign in here to be redirected to the admin page where you can
                create, update and delete my articles! <br /> PS: It won't be
                easy unless... you're a professional
            </p>
            <form>
                <TextField
                    value={email}
                    onChange={(e: React.ChangeEvent<any>) =>
                        setEmail(e.target.value)
                    }
                    label="Email"
                />
                <br />
                <TextField
                    value={password}
                    onChange={(e: React.ChangeEvent<any>) =>
                        setPassword(e.target.value)
                    }
                    label="Password"
                />
                <br /> <br />
                <Button variant="contained" color="primary" onClick={handleSignIn}>
                    Sign In
                </Button>
            </form>
            <hr />
            <figure>
                <p>What it looks like: </p>
                <img src={imgmaster} className="img-master" alt="masterview" />
                <figcaption>View of /masterview route</figcaption>
            </figure>
        </div>
    );
};
