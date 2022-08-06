import React, { useState } from 'react';

import "./Login.css";
import axios from 'axios';




const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const[first_Name, setfirst_name]= useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5002/api/login/${email}/${password}`)
      .then(res => {
        console.log(res.data[0].email);
        console.log(res.data[0].firstname);
        localStorage.setItem("userInfo", JSON.stringify(res.data[0]));
        window.location = '/Category';

      }).catch(err => {
        console.log(err);
      })

  }

  return (
    <div style={{ marginTop: "100px" }}>
      <label className='loginlabelContainer'> Log In to Your Account </label>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"

      }}
        onSubmit={loginSubmit}>
        <br />
        <input
          className='inputboxLoginstyle'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <br/>
        <input
          className='inputboxLoginstyle'
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <br/>
        <div className='submitbuttonstyle' >
        <input type="submit" value="Log In" />
        </div>
        <br/>
        <br/>
        <div>
          <label className='secondContainer'>Need an account? </label>
          
          <a href='/'>
            <strong>
              <label className='signupTextstyle'> SignUp</label>
            </strong>
          </a>
        </div>

      </form>


    </div>
  )
}

export default Login