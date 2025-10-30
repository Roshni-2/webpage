import React, { useEffect, useState } from "react";
import "./PaymentPage.css";
import API_BASE_URL from "../api";


const PaymentPage = () => {
  const [total, setTotal] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
    const details = JSON.parse(localStorage.getItem("shippingDetails")) || {};
    setShippingDetails(details);
  }, []);

  const handlePayment = () => {
    alert("Payment successful! Order placed 🎉");
    localStorage.removeItem("cart");
    localStorage.removeItem("shippingDetails");
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="order-summary">
        <h3>Order Total: ${total.toFixed(2)}</h3>
        <p><strong>Name:</strong> {shippingDetails.name}</p>
        <p><strong>Address:</strong> {shippingDetails.address}</p>
        <p><strong>Phone:</strong> {shippingDetails.phone}</p>
      </div>

      <div className="payment-options">
        <h3>Select Payment Method</h3>
        <label>
          <input type="radio" name="payment" defaultChecked /> Credit / Debit Card
        </label>
        <label>
          <input type="radio" name="payment" /> UPI / Google Pay
        </label>
        <label>
          <input type="radio" name="payment" /> Cash on Delivery
        </label>
      </div>

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
