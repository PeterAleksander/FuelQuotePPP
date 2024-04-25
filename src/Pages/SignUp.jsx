import * as React from "react";
import "../Styles/LoginForm.css"
import { useState } from "react";
import user_icon from '../Styles/Assets/person.png'
import password_icon from '../Styles/Assets/password.png'
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
        <div className='container2' style={{ display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '50px', marginBottom: '50px', background: '#fff', paddingBottom: '25px', width: '575px' }}>
                <form action="">
                    <div className='header'>
                      <h1 className='text'>Register</h1>
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
                    <div className='button1'>
                    <div className='button-container'>
                    <div className='button' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '220px', height: '59px', color: '#fff', background: '#4c00b4', borderRadius: '50px', fontSize: '19px', fontWeight: '700', cursor: 'pointer' }}>
                          <button type="login" onClick={onClickRegister} style={{all: 'unset'}}>Register</button>
                    </div>
                    </div>
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
                    <div className="loginLink" style={{marginTop: 22, textAlign: 'center'}}>
                        <p>Already have an account? <a href="/">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
  );
};