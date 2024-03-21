import React from 'react';
import "../Styles/LoginForm.css"

import {FaUser, FaLock} from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className='container1'>
        <div className= 'container2'>
                <form action="">
                    <h1>Login</h1>

                    <div className="input">
                        <input type="text" placeholder= 'Username' required />
                        {<FaUser className='icon'/>}
                    </div>

                    <div className="input">
                        <input type="password" placeholder='Password' required />
                        {<FaLock className='icon'/>}
                    </div>
                    

                    <div className='button'>
                        <button type="login" href="/profilemanagement">Login</button>
                    </div>

                    <div className="registerLink">
                        <p>Don't have an account? <a href="/profilemanagement">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
  );
};

export default LoginForm;