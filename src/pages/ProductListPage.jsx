import React, { useState, useEffect } from "react";
import "./ProductListPage.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";


const Products = [
  { id: 1, name: "Wireless Headphones", price: 79.99, stock: 15 },
  { id: 2, name: "Mechanical Keyboard", price: 120.5, stock: 5 },
  { id: 3, name: "Gaming Mouse", price: 59.99, stock: 10 },
];

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load products
  useEffect(() => {
    setProducts(Products);
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // Already in cart → increase quantity
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Increment quantity
  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity (remove if quantity = 0)
  const decrement = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const getQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div>
      <h1>🛍️ Product Catalog</h1>

      <div className="product-list">
        {products.map((product) => {
          const quantity = getQuantity(product.id);
          return (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="stock">In Stock: {product.stock}</p>

              {quantity > 0 ? (
                <div className="quantity-controls">
                  <button onClick={() => decrement(product.id)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => increment(product.id)}>+</button>
                </div>
              ) : (
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="cart-footer">
        <button className="view-cart-btn" onClick={handleCart}>
          🛒 View Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;
