import React, { useState } from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"

import { Link } from "react-router";
export default function Navbar() {


  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo}></img>
      <img className='profile' src={assets.profile_image}></img>
      
    </div>
  )
}
