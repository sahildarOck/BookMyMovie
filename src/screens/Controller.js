import React, { useState } from "react";
import Header from "../common/header/Header";
import { UserLoginContext } from "../common/UserLoginContext";
import { Route, Switch, useLocation } from "react-router-dom";
import BookShow from "./bookshow/BookShow"
import LoginRegisterModal from "../common/login_register_modal/LoginRegisterModal";

const Controller = () => {

    const location = useLocation();
    const background = location.state && location.state.background;

    const isUserLoggedIn = () => {
        return getAccessToken() !== null;
    }

    const getAccessToken = () => {
        return window.localStorage.getItem('access-token');
    }

    const [userLoggedIn, setUserLoggedIn] = useState(isUserLoggedIn());

    const loginHandler = async (username, password) => {
        const authorization = window.btoa(`${username}:${password}`);

        const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'authorization': `Basic ${authorization}`
                }
            }
        );

        if (rawResponse.status === 200) {
            const userDetails = await rawResponse.json();
            window.localStorage.setItem('user-details', JSON.stringify(userDetails));
            window.localStorage.setItem('access-token', rawResponse.headers.get('access-token'));

            setUserLoggedIn(true);

            return true;
        } else {
            return false;
        }
    }

    const registerUserHandler = async (registerUserForm) => {
        debugger;
        console.log(registerUserForm);
        const rawResponse = await fetch("http://localhost:8085/api/v1/signup",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerUserForm)
            }
        );

        debugger;
        const data = await rawResponse.json();

        debugger;
        console.log(data);

        if (data && "ACTIVE" === data.status) {
            return true;
        } else {
            return false;
        }
    }

    const logoutHandler = async () => {
        const authorization = getAccessToken();

        const rawResponse = await fetch("http://localhost:8085/api/v1/auth/logout",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': `Bearer ${authorization}`
                }
            }
        );

        const responseHeaders = rawResponse.headers;

        console.log(responseHeaders);

        if (rawResponse.status === 200) {
            window.localStorage.removeItem('user-details');
            window.localStorage.removeItem('access-token');

            setUserLoggedIn(false);
        }
    }

    return (
        <div>
            <UserLoginContext.Provider value={userLoggedIn}>
                <Header logoutHandler={logoutHandler} />
            </UserLoginContext.Provider>
            <Switch location={background || location}>
                <Route path="/bookShow" exact component={BookShow} />
            </Switch>

            {background && <Route path="/login-register-modal" children={<LoginRegisterModal loginHandler={loginHandler} registerUserHandler={registerUserHandler} />} />}
        </div>
    )
}

export default Controller;