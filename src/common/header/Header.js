import React, { useContext } from "react";
import { UserLoginContext } from "../../screens/UserLoginContext";
import logo from "../../assets/logo.svg";
import { Button } from "@material-ui/core";
import "./Header.css";
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from "react";

const Header = (props) => {

   const userLoggedIn = useContext(UserLoginContext);

    const location = useLocation();

    const loginOrLogOut = userLoggedIn ? "LOGOUT" : "LOGIN";

    function bookShowClickHandler() {
        if (userLoggedIn) {
            return "/bookShow"; // TODO: Update
        } else {
            // TODO: Modal should pop up
        }
    }

    function displayBookShow() {
        console.log(`location = ${location}`) // TODO: Remove after debugging
        if (location === "/") { // TODO: Add expected location
            return (
                <Fragment>
                    <Link to={bookShowClickHandler}>
                        <Button id="book-show" variant="contained" color="primary" >BOOKSHOW</Button>)
                    </Link>
                </Fragment>
            )
        }
    }

    function loginLogoutHandler(e) {
        if(e.target.name === "LOGIN") {
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