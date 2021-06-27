import React, { useState } from "react";
import { FormControl, Input, InputLabel } from '@material-ui/core';
import { Fragment } from "react";
import Button from '@material-ui/core/Button';
import "./Login.css"
import { ValidatorForm } from 'react-material-ui-form-validator'

const Login = ({ loginHandler }) => {

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const inputChangedHandler = e => {
        const state = loginForm;
        state[e.target.name] = e.target.value;

        setLoginForm({ ...state });
    }

    const onFormSubmitted = e => {
        e.preventDefault();
        loginHandler(loginForm.username, loginForm.password);
    }

    return (
        <Fragment>
            {/* <ValidatorForm className="login-form" onSubmit={onFormSubmitted}> */}
                <FormControl required={true}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" name="username" onChange={inputChangedHandler} value={loginForm.username} />
                </FormControl>
                <br />
                <br />
                <FormControl required={true}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" name="password" onChange={inputChangedHandler} value={loginForm.password} />
                </FormControl>
                <br />
                <br />
                <br />
                <Button id="login-btn" variant="contained" color="primary" type="submit" onClick={onFormSubmitted}>
                    LOGIN
                </Button>
            {/* </ValidatorForm> */}
        </Fragment>
    )
}

export default Login;