import * as React from 'react';
import "../Styles/LoginForm.css"
import { useState } from "react";
import { userLogin } from '../api/Users.api';
import Alert from "@mui/material/Alert";
import {FaUser, FaLock} from "react-icons/fa";

const LoginForm = () => {
    //alert messages
    const [showAlert1, setShowAlert1] = React.useState(false);
    const [errorMessage1, setErrorMessage1] = React.useState("");
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    //hooks for logging in
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const handleSetUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    };

    const onClickLogin = async event => {
        event.preventDefault();
        var truth1, truth2;
        if (
        Username === "NULL" || Username === "null" || Username === ""
      ) {
        truth1 = null;
      } else {
        truth1 = Username;
      }
      if (Password === "NULL" || Password === "null" || Password === "") {
        truth2 = null;
      } else {
        truth2 = Password;
      }         
        try {
        const logininfo = {
          Username: truth1,
          Password: truth2
        };
        console.log(logininfo);
          const response = await userLogin(logininfo);
          setShowAlert1(false);
          setErrorMessage1("");
          if (response != null) {
            sessionStorage.setItem("currentUser", JSON.stringify(response[0]));
            setSuccessMessage("Login successful!");
            setShowAlertSuccess(true);
            setShowAlert1(false);
          }
          else {
            setErrorMessage1("No user with that login.");
            setShowAlert1(true);
            setShowAlertSuccess(false);
          }
        } catch (error) {
            setErrorMessage1("No user with that login.");
            setShowAlert1(true);
            setShowAlertSuccess(false);
        }
      };

  return (
    <div className='container1'>
        <div className= 'container2'>
                <form action="">
                    <h1>Login</h1>

                    <div className="input1">
                        <input type="text" onChange={handleSetUsername} placeholder= 'Username' required />
                        {<FaUser className='icon'/>}
                    </div>

                    <div className="input2">
                        <input type="password" onChange={handleSetPassword} placeholder='Password' required />
                        {<FaLock className='icon'/>}
                    </div>
                    

                    <div className='button'>
                        <button type="login" onClick={onClickLogin} href="/profilemanagement">Login</button>
                    </div>
                    {showAlertSuccess && (
                      <Alert
                        severity="success"  // This sets the color to green or similar successful color
                        onClose={() => setShowAlertSuccess(false)}
                        sx={{ marginTop: 2, marginBottom: -2 }}
                        >
                        {successMessage}
                      </Alert>
                    )}
                    <div className="registerLink" style={{marginTop: 22}}>
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                    {showAlert1 && (
                        <Alert
                        severity="error"
                        onClose={() => setShowAlert1(false)}
                        sx={{ marginTop: 2, marginBottom: -2 }}
                        >
                        {errorMessage1}
                        </Alert>
                    )}
                </form>
            </div>
        </div>
  );
};

export default LoginForm;