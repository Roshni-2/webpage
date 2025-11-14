import React, { useState } from "react";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";
import API from "../api.js";


const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingDetails", JSON.stringify(formData));
    navigate("/payment");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handlePayment}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
        <input type="text" name="city" placeholder="City" required onChange={handleChange} />
        <input type="text" name="postalCode" placeholder="Postal Code" required onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" required onChange={handleChange} />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
