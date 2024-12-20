import React from 'react'
import "./Sidebar.css"
import {assets} from "../../assets/assets"
import { NavLink } from "react-router"

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
      <NavLink to='/add' className="sidebar-option">
         <img className='logo' src={assets.add_icon}></img>
         <p>Add Items</p>
        
        </NavLink>
      <NavLink to='/list' className="sidebar-option">
         <img className='logo' src={assets.order_icon}></img>
         <p>List Items</p>
        
        </NavLink>
      <NavLink to='/orders' className="sidebar-option">
         <img className='logo' src={assets.order_icon}></img>
         <p>Orders</p>
        
        </NavLink>
      </div>
      
    </div>
  )
}
