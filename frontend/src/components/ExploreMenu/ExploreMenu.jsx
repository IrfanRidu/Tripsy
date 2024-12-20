import React from 'react'
import "./ExploreMenu.css"
import {menu_list} from "../../assets/assets"

export default function ExploreMenu({menuCategory,setMenuCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h2>Explore Our Menu</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, in.</p>
      <div className="explore-menu-list">
      {
        menu_list.map((menu,i)=>{
            return(
                <div onClick={()=>{setMenuCategory((prev)=>prev===menu.menu_name ? "All": menu.menu_name)}} key={i} className='menu-list'>
                <img className={menuCategory=== menu.menu_name? "Active":"" } src={menu.menu_image}></img>
                <p>{menu.menu_name}</p>
            </div>
            )

            
        })
      }
      </div>
      <hr/>
    </div>
  )
}
