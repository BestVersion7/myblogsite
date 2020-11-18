import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUpUser } from "../utilities/apiCall";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const SignUpForm = () => {
    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [account_email, setAccount_email] = useState();
    const [account_password, setAccount_password] = useState();
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e: React.ChangeEvent<any>) => {
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
        <form className="signUpForm">
            <TextField
                onChange={(e: React.ChangeEvent<any>) =>
                    setFirst_name(e.target.value)
                }
                label="First Name"
            />
            <br />
            <TextField
                onChange={(e: React.ChangeEvent<any>) =>
                    setLast_name(e.target.value)
                }
                label="Last Name"
            />
            <br />
            <TextField
                onChange={(e: React.ChangeEvent<any>) =>
                    setAccount_email(e.target.value)
                }
                label="Email"
            />
            <br />
            <TextField
                onChange={(e: React.ChangeEvent<any>) =>
                    setAccount_password(e.target.value)
                }
                label="Password"
            />
            <br /> <br /> <br />
            <Button variant="contained" onClick={handleSubmit}>
                Sign Up
            </Button>
        </form>
    );
};
