import { useEffect } from 'react'
import  { useContext, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

export default function () {

   const {token,url}=useContext(StoreContext)
     const[data,setData]=useState([])
     
     const fetchOrders=async()=>{
        const response= await axios.post (url+"/api/order/userOrders",{},{headers:{token}})
         setData(response.data.data)

     }
 useEffect(()=>{
    if(token){
        fetchOrders()
    }
 },[token])

 

  return (
    <div className='myl-orders' >
      <h2>My Orders</h2>
      <div className="container">
        {
            data.map((data,i)=>{
                <div key={i} className='my-orders-order'>
                     <img src={assets.parcel_icon} alt=''/>
                     <p>
                        {
                            order.items.map((item,i)=>{
                                if(i===order?.items?.length-1){
                                    return item?.name+"X"+item?.quantity
                                }
                                else{
                                    return item?.name+"X"+item?.quantity+"," 
                                }
                            })
                        }
                     </p>
                     <p>${order.amount}.00</p>
                     <p>{order.items.length}</p>
                     <p><span>&#x25cf;</span><b>{order.status}</b> </p>
                     <button onClick={fetchOrders()} >Track Order</button>
                </div>
            })
        }
      </div>
    </div>
  )
}
