import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { signInUser } from "../utilities/apiCall";
import { AuthContext } from "../utilities/authContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const SignInForm = () => {
    const [account_email, setAccount_email] = useState();
    const [account_password, setAccount_password] = useState();
    const [redirect, setRedirect] = useState(false);
    const { setSignedIn } = useContext(AuthContext);

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        // {account_email: account_email} can decompose to just {account_email}
        signInUser({
            account_email,
            account_password,
            setRedirect,
            setSignedIn,
        });
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <form className="signInForm">
            <TextField
            label="Email"
                onChange={(e: React.ChangeEvent<any>) =>
                    setAccount_email(e.target.value)
                }
            />
            <br />
            <TextField
                onChange={(e: React.ChangeEvent<any>) =>
                    setAccount_password(e.target.value)
                }
                label="Password"
            />
            <br /> <br /> <br />
            <Button variant="contained" onClick={handleSubmit}>Sign In</Button>
        </form>
    );
};
