import React, { useContext, } from "react";
import { useNavigate } from "react-router";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";

export default function Cart() {
      
       const navigate= useNavigate()
       const { cartItems, removeFromCart, food_list,getTotalCartAmmount,url } = useContext(StoreContext);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, i) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image}></img>
                  <p>{item.name}</p>

                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
<div>
<div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className="cart-promocode">
        <div>
          <p>Enter Your Promo code</p>
          <div className="promocode-input">
            <input type="text" placeholder="Enter Your Promo code" />
            <button>Submit</button>
          </div>
        </div>
       </div>
      </div>
</div>

    </div>
  );
}
