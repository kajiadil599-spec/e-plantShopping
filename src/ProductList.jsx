import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import './ProductList.css';

function ProductList({ onShowCart }) {
  // Access global state array elements
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Track added items locally using a dictionary key-value pair pattern
  const [addedToCart, setAddedToCart] = useState({});

  // 1. Calculate total item quantity in real-time for the navbar icon
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  // Mock list database array containing target plant details 
  const plantsArray = [
    {
      name: "Snake Plant",
      image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=500",
      description: "Produces oxygen at night and thrives on neglect.",
      cost: "$15"
    },
    {
      name: "Spider Plant",
      image: "https://images.unsplash.com/photo-1572605412044-054f53227185?q=80&w=500",
      description: "Excellent air purifier that grows vibrant offsets.",
      cost: "$12"
    },
    {
      name: "Peace Lily",
      image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=500",
      description: "Beautiful white blooms that tell you when they need water.",
      cost: "$18"
    }
  ];

  // Dispatches actions and locks target click state mapping
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div className="product-layout-wrapper">
      {/* Dynamic Navigation Header Panel */}
      <nav className="navbar">
        <div className="navbar-logo">Paradise Nursery</div>
        <div className="navbar-links">
          <button className="nav-link-btn" onClick={onShowCart}>
            <span className="cart-icon">🛒</span>
            {/* Renders the computed total value dynamically */}
            <span className="cart-badge">{calculateTotalQuantity()}</span>
          </button>
        </div>
      </nav>

      {/* Main Container Grid requested by instructions */}
      <div className="product-grid">
        {plantsArray.map((plant, index) => (
          <div className="product-card" key={index}>
            <img className="product-image" src={plant.image} alt={plant.name} />
            <h3 className="product-title">{plant.name}</h3>
            <p className="product-description">{plant.description}</p>
            <div className="product-cost">{plant.cost}</div>
            
            <button
              className="add-to-cart-btn"
              disabled={addedToCart[plant.name]}
              onClick={() => handleAddToCart(plant)}
            >
              {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;