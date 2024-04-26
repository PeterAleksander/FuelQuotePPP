import * as React from 'react';
import "../Styles/LoginForm.css"
import { useState, useEffect } from "react";
import { userLogin } from '../api/Users.api';
import Alert from "@mui/material/Alert";
import user_icon from '../Styles/Assets/person.png'
import password_icon from '../Styles/Assets/password.png'
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

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
            navigate('/profilemanagement');
          }
          else {
            setErrorMessage1("Incorrect Username or Password.");
            setShowAlert1(true);
            setShowAlertSuccess(false);
          }
        } catch (error) {
            setErrorMessage1("Incorrect Username or Password.");
            setShowAlert1(true);
            setShowAlertSuccess(false);
        }
      };
  return (
    <div className='container1'>
        <div className='container2' style={{ display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '50px', marginBottom: '50px', background: '#fff', paddingBottom: '25px', width: '575px' }}>
                <form action="">
                    <div className='header'>
                      <h1 className='text'>Login</h1>
                      <div className='underline'></div>
                    </div>
                    <div className='inputs'>
                    <div className="input1" style={{ display: 'flex', alignItems: 'center', margin: 'auto', width: '480px', height: '80px', background: '#eaeaea', borderRadius: '6px' }}>
                          <img src={user_icon} alt=''/>
                          <input type="text" style={{ height: '50px', width: '400px', background: 'transparent', border: 'none', outline: 'none', color: '#797979', fontSize: '19px' }} onChange={handleSetUsername} placeholder= 'Username' required />
                      </div>

                      <div className="input2" style={{ display: 'flex', alignItems: 'center', margin: 'auto', width: '480px', height: '80px', background: '#eaeaea', borderRadius: '6px' }}>
                          <img src={password_icon} alt=''/>
                          <input type="password" style={{ height: '50px', width: '400px', background: 'transparent', border: 'none', outline: 'none', color: '#797979', fontSize: '19px' }} onChange={handleSetPassword} placeholder='Password' required />
                      </div>
                    </div>
                    <div className='button-container'>
                      <div  data-testid="login-form" className='button' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '220px', height: '59px', color: '#fff', background: '#4c00b4', borderRadius: '50px', fontSize: '19px', fontWeight: '700', cursor: 'pointer' }}>
                          <button type="login" onClick={onClickLogin} href="/profilemanagement" style={{all: 'unset'}}>Login</button>
                      </div>
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
                    <div className="registerLink" style={{marginTop: 22, textAlign: 'center'}}>
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