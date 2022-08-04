import React, {useState} from 'react';

import "./Login.css";
import axios from 'axios';




const Login = () => {
    
    const[email, setEmail] = useState("");
    const[password,setPassword] =useState("");
    // const[first_Name, setfirst_name]= useState("");
    
const loginSubmit = async(e) =>{
    e.preventDefault();
     
    axios
    .get(`http://localhost:5002/api/login/${email}/${password}`)
    .then(res=>{
    console.log(res.data[0].email);
    console.log(res.data[0].firstname);
    localStorage.setItem("userInfo", JSON.stringify(res.data[0]));
      window.location='/Category';
    
    }).catch(err=>{
        console.log(err);
    })
   
}

  return (
     <div style={{marginTop: "100px"}}>
      <label className='labelContainer'> Login </label>
    <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"

    }} 
    onSubmit={loginSubmit}>
   
   
    <label className='emailContainer'>Email-Id:</label>
    <br/>
        <input
        className='inputbox-Style'
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email Id"
       />
       <br/>
       
       
        <label className='passwordContainer'>Password:</label>
        
        <input
        className='inputbox-Style'
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Password"
          />
        <br/>
        <input type="submit" value="Login"/>
        <a href="/">
            <input type="button" value="Go Back"/>
        </a>
    </form>


    </div>
  )
}

export default Login