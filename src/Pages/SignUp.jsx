import * as React from "react";
import "../Styles/LoginForm.css"
import { useState } from "react";
import {FaUser, FaLock} from "react-icons/fa";
import Alert from "@mui/material/Alert";
import { userRegistration } from "../api/Users.api";

export default function RegisterForm() {
    //alert messages
    const [showAlert1, setShowAlert1] = React.useState(false);
    const [errorMessage1, setErrorMessage1] = React.useState("");
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    //hooks for registering
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const handleSetUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    };

const onClickRegister = async event => {
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
        const newUser = {
          Username: truth1,
          Password: truth2,
        };
        console.log(newUser);
        await userRegistration(newUser);
        setSuccessMessage("Registration successful!");
        setShowAlertSuccess(true);
        setShowAlert1(false);
        setErrorMessage1("");
      } catch (error) {
        setErrorMessage1("Input error, please fix!");
        setShowAlert1(true);
        setShowAlertSuccess(false); 
      }                        
}       

  return (
    <div className='container1'>
        <div className= 'container2'>
                <form action="">
                    <h1>Register</h1>

                    <div className="input1">
                        <input type="text" onChange={handleSetUsername} placeholder= 'Username' required />
                        {<FaUser className='icon'/>}
                    </div>

                    <div className="input2">
                        <input type="password" onChange={handleSetPassword} placeholder='Password' required />
                        {<FaLock className='icon'/>}
                    </div>

                    <div className='button1'>
                        <a href="/">
                        <button type="login" onClick={onClickRegister}>Register</button>
                        </a>
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
                    {showAlertSuccess && (
                        <Alert
                        severity="success"  // This sets the color to green or similar successful color
                        onClose={() => setShowAlertSuccess(false)}
                        sx={{ marginTop: 2, marginBottom: -2 }}
                        >
                        {successMessage}
                        </Alert>
                    )}
                </form>
            </div>
        </div>
  );
};