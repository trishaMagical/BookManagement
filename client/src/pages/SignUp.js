import React, {useState,useEffect} from 'react';
import { useHistory,useParams,Link } from 'react-router-dom';
import "./SignUp.css"

import axios from 'axios';
import {toast} from "react-toastify";
// import { toToastItem } from 'react-toastify/dist/utils';

const initialState ={
    firstname :"",
    email:"",
    password:""

}
const SignUp = (props) => {
    const [state, setState]= useState(initialState);


    const [is_Update, setis_Update]= useState(false);

    const [ids, setIds]= useState("");

    const {firstname,email, password} = state;
    
    const history = useHistory();

    const {id} = useParams();
    
    useEffect  (  ()=>{
        try{
            console.log("Hello",props.location.pathname);
            let  path= props.location.pathname;
            let arr = path.split("/");
            console.log("arr", arr);
            
            if (arr.length===3){
                const id = arr[arr.length-1];
                setIds(id);
                console.log("id", id);
                 axios.get (`http://localhost:5002/api/get/${id}`)
                .then (res =>{
                   const obj =
                   {
                    firstname :res.data[0].firstname, 
                    email:res.data[0].email,
                    password:res.data[0].password,
                   }
                    setState(obj);
                    setis_Update(true);
                    console.log("Hello",res.data[0],state);
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);

                })

                
               
            
            }
            else{
    
            }
        }
        catch(ex){
            console.log("exception",ex);
        }
        

       
    },0)

    const handleSubmit = async (e) =>{
        console.log("Hi");
        console.log(firstname,email,password);
        e.preventDefault();
        if(!firstname ||  !email || !password){
            toast.error("Please fill the form");

        } else {
            console.log("Hi2",is_Update);
            if (is_Update=== false){
                
                await axios.post("http://localhost:5002/addNewlogin", 
                state
            ).then(()=>{
                setState({firstname:"", email:"",password:""})
                
            }).catch((err)=> toast.error(err.response.data))
           
            } else{
                await axios.post(`http://localhost:5002/updateuser/${id}`, 
                state
            ).then(()=>{
                setState({firstname:"",email:"",password:""})
                
            }).catch((err)=> toast.error(err.response.data))
            
            }
            setTimeout(()=>{
                history.push("/")
                }, 500);
        }
    }
   
    const handleInputChangeforName = (e) =>{    
        const temp = {...state}
        temp.firstname = e.target.value; 
    //   const name=e.target.value;
    //     console.log("FirstName:",name);
         setState(temp);
    }

    const handleInputChangeforEmail = (e) =>{
        const temp = {...state}
        temp.email = e.target.value;
        // const job_role = e.target.value;
        // console.log("Job_Role", job_role);
        setState(temp);
    }
    const handleInputChangeforPassword = (e) =>{
        const temp = {...state}
        temp.password = e.target.value;
        // const job_role = e.target.value;
        // console.log("Job_Role", job_role);
        setState(temp);
    }

  return (
    <div style={{marginTop: "100px"}}>
        <label className='labelContainer'>Sign Up</label>
        <form  style={{
            margin:"auto",
            // padding:"15px",
             maxWidth:"400px",
            alignContent:"center"

    }}
    onSubmit={handleSubmit}>
        <div className='mainContainer'>
        <label >Already a member?</label>
        <a href='/login'>
            <strong>
            <label className='loginText'>Log In</label>
            </strong>
        
        </a>
        </div>
       
        
        <br/>
      
        <input
        className='inputbox-Style'
        type="text"
        id="name"
        name="name"
        placeholder="First Name"
        value={firstname || ""}
        onChange={handleInputChangeforName}
        />
        <br/>
        <br/>
      
        
        
        <input
        className='inputbox-Style'
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={email || ""}
        onChange={handleInputChangeforEmail}
        />
        <br/>
        <br/>
       
        <input
        className='inputbox-Style'
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password || ""}
        onChange={handleInputChangeforPassword}
        />
        <br/>
        <br/>
        <input className='SignUpbutton' type="submit" value="SignUp"/>
        
        </form>
        
    </div>
  )
}

export default SignUp