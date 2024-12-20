import React, { useContext, useState } from 'react'
import "./LoginPopup.css"

import { StoreContext, } from '../../Context/StoreContext'
import axios from 'axios'

export default function LoginPopup({setShowLogin}) {

  const {url,setToken}=useContext(StoreContext);
    const [currentState,setCurrentState]=useState("Login")
    const [data,setData]=useState({
      name:"",
      email:"",
      password:"",
    })

      const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData(data=>({...data,[name]:value}))
      }

      const onLogin=async(e)=>{
        e.preventDefault()
         let newUrl=url;
         if(currentState==="Login"){
          newUrl+="/api/user/login"
         }
         else{
          newUrl+="/api/user/register"
         }
         const response=await axios.post(newUrl,data);
         console.log(response.data)
         if (response.data.success){
          setToken(response.data.data)
          localStorage.setItem("token",response.data.data)
          setShowLogin(false)
         }
         else{
          alert(response.data.message)
         }
        
      }

  return (
    <div className='login-popup'>
     <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currentState}</h2>
            {/* <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}></img> */}
            <p className='X' onClick={()=>setShowLogin(false)}  >X</p>
        </div>
        <div className="login-popup-input">
          
          {
            currentState==="Login"? <></> : 
            <input onChange={onChangeHandler} name='name' value={data.name} type='text' placeholder='Enter your name' required />
          }
          <input onChange={onChangeHandler} name='email' value={data.email}  type='email' placeholder='Enter your email'required />
          <input onChange={onChangeHandler} name='password' value={data.password} type='password' placeholder='Enter your password'required />

        </div>

        <button type='submit'>{currentState==="Sign Up" ? "Sign Up":"Log In"}</button>
        <div className="login-popup-conditon">
            <input type='checkbox' required /><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, cumque.</p>
        </div>

{
    currentState==="Sign Up"?<p>Have an account? <span onClick={()=>{setCurrentState("Login")}} >Login</span></p>:<p>Don't have an account? <span onClick={()=>{setCurrentState("Sign Up")}} >Sign Up</span></p>
}

     </form>
    </div>
  )
}
