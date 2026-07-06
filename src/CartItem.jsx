import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Helper parser script logic stripping '$' and evaluation values
  const parseCost = (costString) => {
    if (typeof costString === 'number') return costString;
    return parseFloat(costString.substring(1)) || 0;
  };

  // Calculates global cart aggregate value sum balances
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + parseCost(item.cost) * item.quantity;
    }, 0);
  };

  // Computes isolated card item grid row pricing subtotals
  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
  };

  // Routes routing commands backward to landing interfaces
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Dispatches complete removal when boundaries hit zero
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  // Step 3 layout alert placeholder requirement integration
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 className="total-cart-amount">Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div className="cart-item-card" key={index}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              
              <div className="cart-item-quantity-controls">
                <button className="quantity-btn btn-minus" onClick={() => handleDecrement(item)}>-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="quantity-btn btn-plus" onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <div className="cart-item-subtotal">Total: ${calculateTotalCost(item)}</div>
              
              <button className="delete-btn" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-navigation-buttons">
        <button className="continue-shopping-btn" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;