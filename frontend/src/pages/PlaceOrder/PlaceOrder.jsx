import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from "react-router";

export default function PlaceOrder() {
  const {getTotalCartAmmount,token,food_list,cartItems,url}=useContext(StoreContext)
   const[data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    address:"",
    city:"",
    street:"",
    phone:""
   })
    
   const navigate=useNavigate()
   const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder= async (e)=>{
    e.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
// console.log(orderItems)
let orderData={
  address:data,
  items:orderItems,
  amount:getTotalCartAmmount()+2
}
let response= await axios.post (url+"/api/order/place",orderData,{headers:{token}})
if(response.data.success){
  const{session_url}=response.data;
  window.location.replace(session_url);
}
else{
  alert("Error")
}
  }

   useEffect(()=>{
      if(!token){
          navigate("/cart")
      }
      else if(getTotalCartAmmount()===0){
        navigate("/cart")
      }
   },[token])


  return (
    <form onSubmit={placeOrder} className='placeorder'>
      <div className="placeorder-left">
     <p>Delivery Information</p>
     <div className="multifield">
      <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' />
      <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name' />
     </div>
     <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email' />
     <input required name='phone' onChange={onChangeHandler} value={data.phone} type='number' placeholder='Phone' />
     <input required name='address' onChange={onChangeHandler} value={data.address} type='text' placeholder='Address' />
     <div className="multifield">
      <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
      <input name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
     </div>
      </div>
      <div className="placeorder-right">
      <div className="cart-total">
          <h2>Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery charge</p>
            <p>$ {getTotalCartAmmount()===0 ? 0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>$ {getTotalCartAmmount()===0 ? 0: getTotalCartAmmount()+2}</p>
          </div>
          <hr />
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}
