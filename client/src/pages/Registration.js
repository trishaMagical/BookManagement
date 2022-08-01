import React from 'react';
import "./Registration.css";
import { Link } from "react-router-dom";
const Registration = () => {
    return (
        <div>
            <h1>Registration Page</h1>
            <form>
                <h2>New User ??</h2>
                <a href='/SignUp'>
                <input type="button2" value="SignUp"/>
                
                </a>


                <br />
                <h2>Already Sign Up</h2>
                <a href='/login'>
                <input type="button1" value="Login"/>
                
                </a>
            </form>



        </div>
    )
}

export default Registration