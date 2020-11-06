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

    const handleClickIconMobile = () => {
        setMobileIcon(!mobileIcon);
        setShowNav(!showNav);
    };
    const handleClickLinkMobile = () => {
        window.scrollTo(0, 0);
        setMobileIcon(!mobileIcon);
        setShowNav(!showNav);
    };
    const handleClickLinkDesktop = () => {
        window.scrollTo(0, 0);
    };

    const handleSignoutMobile = () => {
        cookie.remove("jan");
        window.scrollTo(0, 0);
        setSignedIn(false);
        setMobileIcon(!mobileIcon);
        setShowNav(!showNav);
    };
    const handleSignoutDesktop = () => {
        cookie.remove("jan");
        window.scrollTo(0, 0);
        setSignedIn(false);
    };

    return (
        <header>
            <nav className="section-nav">
                {mobileIcon ? (
                    <IconContext.Provider
                        value={{ className: "section-nav-icon-provider" }}
                    >
                        <GiHamburgerMenu onClick={handleClickIconMobile} />
                    </IconContext.Provider>
                ) : (
                    <IconContext.Provider
                        value={{ className: "section-nav-icon-provider" }}
                    >
                        <AiOutlineClose onClick={handleClickIconMobile} />
                    </IconContext.Provider>
                )}
                {showNav ? (
                    <nav className="section-navlink-container">
                        <div className="section-navlink-container-blank">
                            <NavLink
                                onClick={handleClickLinkDesktop}
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
                                    onClick={handleSignoutDesktop}
                                >
                                    Sign Out
                                </NavLink>
                            ) : (
                                <NavLink
                                    onClick={handleClickLinkDesktop}
                                    className="section-nav-links"
                                    to="/signin"
                                >
                                    Sign In
                                </NavLink>
                            )}
                            <NavLink
                                onClick={handleClickLinkDesktop}
                                className="section-nav-links"
                                to="/donate"
                            >
                                Donate
                            </NavLink>
                            <NavLink
                                onClick={handleClickLinkDesktop}
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
                                onClick={handleClickLinkMobile}
                                className="section-nav-links"
                                to="/"
                                exact={true}
                            >
                                Home
                            </NavLink>
                            {signedIn ? (
                                <NavLink
                                    onClick={handleSignoutMobile}
                                    className="section-nav-links"
                                    to="/"
                                >
                                    Sign Out
                                </NavLink>
                            ) : (
                                <NavLink
                                    onClick={handleClickLinkMobile}
                                    className="section-nav-links"
                                    to="/signin"
                                >
                                    Sign In
                                </NavLink>
                            )}
                            <NavLink
                                onClick={handleClickLinkMobile}
                                className="section-nav-links"
                                to="/donate"
                            >
                                Donate
                            </NavLink>
                            <NavLink
                                onClick={handleClickLinkMobile}
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
