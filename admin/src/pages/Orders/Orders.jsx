import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
export default function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      alert("Error");
    }
  };
  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, i) => {
          <div key={i} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, i) => {
                  if (i === order?.items?.length - 1) {
                    return item?.name + "X" + item?.quantity;
                  } else {
                    return item?.name + "X" + item?.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p> {order.address.address + ","}</p>
                <p> {order.address.city + ", " + order.address.state}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select
              value={order.status}
              onChange={() => statusHandler(e, order._id)}
            >
              <option value="Order Processing">Order Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Deliverd">Deliverd</option>
            </select>
          </div>;
        })}
      </div>
    </div>
  );
}
