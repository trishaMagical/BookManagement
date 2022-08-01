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
     <div>
    <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"

    }} 
    onSubmit={loginSubmit}>
    <h2>Login Page</h2>    
    <label className='label-Size'><h3>Email-Id:</h3></label>
    
        <input
        className='inputbox-Size'
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="         Your Email Id"
       />
       <br/>
       <br/>
       
        <label><h3>Password:</h3></label>
        
        <input
        className='inputbox-Size'
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="        Your Password"
      
        
        />
        
        <input type="submit" value="Login"/>
    </form>


    </div>
  )
}

export default Login