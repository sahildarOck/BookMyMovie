import React, { useContext } from "react";
import { UserLoggedinContext } from "../UserLoggedinContext";
import logo from "../../assets/logo.svg";
import { Button } from "@material-ui/core";
import "./Header.css";
import { Link, useLocation } from 'react-router-dom';

const Header = ({ logoutHandler }) => {

    const userLoggedIn = useContext(UserLoggedinContext);

    const location = useLocation();

    const displayBookShow = () => {
        if (location.pathname.includes("/movie/")) {
            if (userLoggedIn) {
                return <Button id="book-show" variant="contained" color="primary" component={Link} to="/bookShow/:id">BOOKSHOW</Button>;
            } else {
                return (
                    <Link
                        to={{
                            pathname: "/login-register-modal",
                            state: { background: location }
                        }}>
                        <Button id="book-show" variant="contained" color="primary">BOOKSHOW</Button>
                    </Link>
                )
            }
        }
    }

    const displayLoginOrLogout = () => {
        if (userLoggedIn) {
            return <Button className="user-state-btn" id="logout-btn" variant="contained" name="logout-btn" onClick={logoutHandler}>LOGOUT</Button>
        } else {
            return (
                <Link
                    to={{
                        pathname: "/login-register-modal",
                        state: { background: location }
                    }}>
                    <Button className="user-state-btn" id="login-btn" variant="contained" name="login-btn">LOGIN</Button>
                </Link >
            )
        }
    }

    return (
        <div id="header">
            <div className="logo">
                <img alt="Logo" className="rotate" src={logo} />
            </div>
            <div className="btn">
                {displayBookShow()}
                {displayLoginOrLogout()}
            </div>
        </div>
    )
}

export default Header;