import React, { useContext, useState } from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets'
import { Link, useNavigate } from "react-router";
import { StoreContext } from '../../Context/StoreContext';
export default function Navbar({setShowLogin}) {

  const [menu,setMenu]=useState('Home')
  const{getTotalCartAmount,token,setToken}=useContext(StoreContext);
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    <div className='navbar'>
     <Link to='/'> <img className='logo' src={assets.logo}></img></Link>
      <ul className='navbar-menu'>
      <Link to='/'> <li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""} >Home</li></Link>
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""} >Menu</a>
        <li onClick={()=>setMenu("Mobile-App")} className={menu==="Mobile-App"?"active":""} >Mobile-App</li>
        <li onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""} >Contact-us</li>
        </ul>
        <div className='navbar-right'>
             <img src={assets.search_icon} alt=''></img>
             <div className="navbar-search">
              <Link to='/cart'> <img src={assets.basket_icon}></img></Link>
              <div className="dot"></div>
             </div>
         {
          !token ?              <button onClick={()=>{setShowLogin(true)}} className='navbar-button'>Sign In</button>:<div className='navbar-profile'>
             <img src={assets.profile_icon} alt="" />
             <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/myOrders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr/>
              <li onClick={handleLogout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
             </ul>
          </div>
         }
        </div >
      
    </div>
  )
}
