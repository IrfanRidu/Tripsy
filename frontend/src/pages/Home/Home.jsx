import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

export default function Home() {
 
  const [menuCategory,setMenuCategory]=useState("All")

  return (
    <div>
      <Header/>
      <ExploreMenu menuCategory={menuCategory} setMenuCategory={setMenuCategory}/>
      <FoodDisplay menuCategory={menuCategory}/>
    </div>
  )
}
