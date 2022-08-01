import React from 'react';
import "./Registration.css";
import { Link } from "react-router-dom";
const Registration = () => {
    return (
        <div>
            <h1>Registration Page</h1>
            <form>
                <h2>New User ??</h2>
                <Link to="SignUp">
                    <button class="button1">Sign Up</button>
                </Link>


                <br />
                <h2>Already Sign Up</h2>
                <Link to="/login/user">
                    <button class="button2">Login</button>
                </Link>
            </form>



        </div>
    )
}

export default Registration