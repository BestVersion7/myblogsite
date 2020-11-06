import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../utilities/authContext";
import cookie from "js-cookie";

export const Navigation = () => {
    const { signedIn, setSignedIn } = useContext(AuthContext);
    const [mobileIcon, setMobileIcon] = useState(true);
    const [showNav, setShowNav] = useState(true);

    const handleClick = () => {
        setMobileIcon(!mobileIcon);
        setShowNav(!showNav);
    };
    const handleCollapse = () => {
        window.scrollTo(0, 0);
        setMobileIcon(!mobileIcon);
        setShowNav(!showNav);
    };
    const handleClickNav = () => {
        window.scrollTo(0, 0);
    };

    const handleSignout = () => {
        cookie.remove("jan");
        window.scrollTo(0, 0);
        setSignedIn(false)
        setMobileIcon(!mobileIcon);
        setShowNav(!showNav);
    };

    return (
        <header>
            <nav className="section-nav">
                {mobileIcon ? (
                    <IconContext.Provider
                        value={{ className: "section-nav-icon-provider" }}
                    >
                        <GiHamburgerMenu onClick={handleClick} />
                    </IconContext.Provider>
                ) : (
                    <IconContext.Provider
                        value={{ className: "section-nav-icon-provider" }}
                    >
                        <AiOutlineClose onClick={handleClick} />
                    </IconContext.Provider>
                )}
                {showNav ? (
                    <nav className="section-navlink-container">
                        <div className="section-navlink-container-blank">
                            <NavLink
                                onClick={handleClickNav}
                                className="section-nav-links"
                                to="/"
                                exact={true}
                            >
                                Home
                            </NavLink>
                            {signedIn ? (
                                <NavLink
                                    className="section-nav-links"
                                    to="/"
                                    onClick={handleSignout}
                                >
                                    Sign Out
                                </NavLink>
                            ) : (
                                <NavLink
                                    onClick={handleClickNav}
                                    className="section-nav-links"
                                    to="/signin"
                                >
                                    Sign In
                                </NavLink>
                            )}
                            <NavLink
                                onClick={handleClick}
                                className="section-nav-links"
                                to="/donate"
                            >
                                Donate
                            </NavLink>
                            <NavLink
                                onClick={handleClick}
                                className="section-nav-links"
                                to="/master"
                            >
                                Master
                            </NavLink>
                        </div>
                    </nav>
                ) : (
                    <nav className="section-navlink-container-mobile">
                        <div className="section-navlink-container-blank">
                            <NavLink
                                onClick={handleCollapse}
                                className="section-nav-links"
                                to="/"
                                exact={true}
                            >
                                Home
                            </NavLink>
                            {signedIn ? (
                                <NavLink
                                    onClick={handleSignout}
                                    className="section-nav-links"
                                    to="/"
                                >
                                    Sign Out
                                </NavLink>
                            ) : (
                                <NavLink
                                    onClick={handleCollapse}
                                    className="section-nav-links"
                                    to="/signin"
                                >
                                    Sign In
                                </NavLink>
                            )}
                            <NavLink
                                onClick={handleCollapse}
                                className="section-nav-links"
                                to="/donate"
                            >
                                Donate
                            </NavLink>
                            <NavLink
                                onClick={handleCollapse}
                                className="section-nav-links"
                                to="/master"
                            >
                                Master
                            </NavLink>
                        </div>
                    </nav>
                )}
            </nav>
        </header>
    );
};
