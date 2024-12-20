import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
export default function FoodDisplay({menuCategory}) {
  
    const{food_list}=useContext(StoreContext)
  return (
    <section className='food-display' id='food-display'>
       <h2>Foods Near You</h2>
     <div className="food-display-list">
     {
        food_list.map((item,i)=>{

          if(menuCategory==="All" || menuCategory===item.category){
            return(
              <FoodItem key={i} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description} />
          )

          }

        })
      }
     </div>
    </section>
  )
}
