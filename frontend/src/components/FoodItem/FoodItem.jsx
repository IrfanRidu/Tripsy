import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
export default function FoodItem({image,id,price,description,name}) {
 

  const{ cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
        <img className='food-item-img' src={url+"/images/"+image} alt='name'></img>
        {
          !cartItems[id]? <img className='add-white' src={assets.add_icon_green} onClick={()=>addToCart(id)} /> :
           <div className='counter'>
            <img className='remove' src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} />
            <p className='count-item'>{cartItems[id]}</p>
            <img className='add-green' src={assets.add_icon_green} onClick={()=>addToCart(id)} />
           </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
        <p>{name}</p>
        <img src={assets.rating_starts} ></img>
        </div>
        <p className='food-item-des'>{description}</p>
        <p className='food-item-price'>$ {price}</p>
      </div>
    </div>
  )
}
