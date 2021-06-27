import React, { useContext } from "react";
import { UserLoginContext } from "../UserLoginContext";
import logo from "../../assets/logo.svg";
import { Button } from "@material-ui/core";
import "./Header.css";
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from "react";

const Header = (bookShowHandler) => {

    const userLoggedIn = useContext(UserLoginContext);

    const location = useLocation();

    const loginOrLogOut = userLoggedIn ? "LOGOUT" : "LOGIN";

    function displayBookShow() {
        console.log(`location = ${location}`) // TODO: Remove after debugging
        if (location === "/") { // TODO: Add expected location
            if (userLoggedIn) {
                return <Button id="book-show" variant="contained" color="primary" component={Link} to="/bookShow">BOOKSHOW</Button>;
            } else {
                return <Button id="book-show" variant="contained" color="primary" onClick={bookShowHandler}>BOOKSHOW</Button> // TODO: Modal pop up code
            }
        }
    }

    function loginLogoutHandler(e) {
        if (e.target.name === "LOGIN") {
            loginHandler();
        } else {
            logouthandler();
        }
    }

    function loginHandler() {

    }

    function logouthandler() {

    }

    return (
        <div id="header">
            <div className="logo">
                <img alt="Logo" className="rotate" src={logo} />
            </div>
            <div className="button">
                {displayBookShow()}
                <Button id="login-logout" variant="contained" name={loginOrLogOut} onClick={loginLogoutHandler}>{loginOrLogOut}</Button>
            </div>
        </div>
    )
}

export default Header;