import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { validateMasterCookie } from "./apiCall";

export function ProtectedRoute({ component: Component, ...rest }) {
    const [signedIn, setSignedIn] = useState(true);

    useEffect(() => {
        validateMasterCookie({ setSignedIn });
        // console.log("running redirect");
    }, []);
    return (
        <Route
            {...rest}
            render={(props) =>
                signedIn ? <Component {...props} /> : <Redirect to="/master" />
            }
        />
    );
}

export default ProtectedRoute;
