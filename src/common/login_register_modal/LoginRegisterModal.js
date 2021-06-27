import React, { useState } from "react";
import Modal from 'react-modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from "../login/Login"
import Register from "../register/Register";
import "./LogisRegisterModal.css";


const LoginRegisterModal = ({ loginHandler, registerUserHandler }) => {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [value, setValue] = useState(0);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography component={'span'} variant={'body2'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Modal
            className="modal"
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            appElement={document.getElementById('root')}
        >
            <Paper square>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="LOGIN" />
                    <Tab label="REGISTER" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <Login loginHandler={loginHandler} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Register registerUserHandler={registerUserHandler} />
                </TabPanel>
            </Paper>
        </Modal>
    )
}

export default LoginRegisterModal;