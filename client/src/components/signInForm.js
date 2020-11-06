import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { signInUser } from "../utilities/apiCall";
import { AuthContext } from "../utilities/authContext";


export const SignInForm = () => {
    const  {setSignedIn} = useContext(AuthContext)
    const [account_email, setAccount_email] = useState("");
    const [account_password, setAccount_password] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // {account_email: account_email} can decompose to just {account_email}
        signInUser({ account_email, account_password, setRedirect });
        setSignedIn(true)
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <b>Sign In Here:</b>
            </p>
            <label>Username</label>
            <input
                value={account_email}
                onChange={(e) => setAccount_email(e.target.value)}
                type="text"
            />
            <label>Password</label>
            <input
                value={account_password}
                onChange={(e) => setAccount_password(e.target.value)}
                type="text"
            />
            <button>Sign In</button>
        </form>
    );
};
