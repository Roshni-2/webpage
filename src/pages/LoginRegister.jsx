import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import "../App.css";
import API from "../api.js";
import API_BASE_URL from "../config";


const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${API_BASE_URL}/api/users/login` 
      : `${API_BASE_URL}/api/users/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert(isLogin ? "Login successful!" : "Registration successful!");

        // ✅ store token if backend sends it
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // ✅ redirect to ProductList page
        navigate("/products");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };
  return (
    
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="form">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="button">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p>
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <span className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default LoginRegister;
