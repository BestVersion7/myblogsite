import React from "react";
import { SignInForm } from "../components/signInForm";
import { NavLink } from "react-router-dom";

export const SignIn = () => {
    return (
        <main className="route-signin">
            <SignInForm /> <br />
            <NavLink className="container-nav-link" to="/signup">
                New User? Create an account here
            </NavLink>
            <br /> <br />
            <p style={{"color": 'red'}}>
                Don't want to create an account? <br />
                Use Mine! <br /> Username: test@test.com <br />
                Password: 1
            </p>
        </main>
    );
};
