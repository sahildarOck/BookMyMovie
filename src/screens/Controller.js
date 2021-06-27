import React from "react";
import Header from "../common/header/Header";
import { UserLoginContext } from "../common/UserLoginContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home/Home";
import BookShow from "./bookshow/BookShow"
import LoginRegisterModal from "../common/login_register_modal/LoginRegisterModal";

const Controller = () => {

    const userLoggedIn = false; // TODO

    const loginHandler = async (username, password) => {

        const authorization = window.btoa(`${username}:${password}`);

        const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    'Accpet': 'application/json;charset=UTF-8',
                    'authorization': `Basic ${authorization}`
                }
            }
        );

        const responseHeaders = rawResponse.headers;

        console.log(responseHeaders);
    }

    const registerUserHandler = async (registerUserForm) => {
        const rawResponse = await fetch("http://localhost:8085/api/v1/auth/signup",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerUserForm)
            }
        );

        const data = await rawResponse.json();

        if (data && "ACTIVE" === data.status) {
            return Promise.resolve(true);
        } else {
            return Promise.reject(false);
        }
    }

    const bookShowHandler = () => {
        // TODO: Call code to open Book Show page
    }

    return (
        // <Router>
        //     <div>
        //         <UserLoginContext.Provider value={userLoggedIn}>
        //             <Header bookShowHandler = {bookShowHandler}/>
        //         </UserLoginContext.Provider>
        //         <Route exact path="/" render={(props) => { <Home {...props}/> }} />
        //         <Route exact path="/bookShow" render={() => { <BookShow /> }} />
        //     </div>
        // </Router>

        <LoginRegisterModal loginHandler={(username, password) => { loginHandler(username, password) }} registerUserHandler={(registerUserForm) => { registerUserHandler(registerUserForm) }} />
    )
}

export default Controller;