import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUpUser } from "../utilities/apiCall";

export const SignUpForm = () => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [account_email, setAccount_email] = useState("");
    const [account_password, setAccount_password] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        signUpUser({
            first_name,
            last_name,
            account_email,
            account_password,
            setRedirect,
        });
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <form>
            <label>First Name</label>
            <input
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                type="text"
            />
            <label>Last Name</label>
            <input
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                type="text"
            />
            <label>Email address</label>
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
            <button onClick={handleSubmit}>Sign Up</button>
        </form>
    );
};
