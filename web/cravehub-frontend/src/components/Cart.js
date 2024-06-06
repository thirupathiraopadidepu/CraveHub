import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, checkout, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [address, setAddress] = useState({ street: '', city: '', state: '', postalCode: '' });
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [orderedItems, setOrderedItems] = useState([]);

  const handleCheckout = () => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('phoneNumber');
    if (!isLoggedIn) {
      alert('Please login to proceed with checkout or sign up if you do not have an account.');
      return; // Exit the function if the user is not logged in
    }

    // Show address and payment details directly on the cart page
    if (!cartItems.length) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    // Validate address and payment details
    if (!address.street || !address.city || !address.state || !address.postalCode) {
      alert('Please fill in all address fields.');
      return;
    }

    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      alert('Please fill in all payment details.');
      return;
    }

    // Perform order logic
    checkout();
    setOrderedItems(cartItems);
    // Redirect to home page or display success message
    alert('Order successful!');
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  // Calculate total cost
  const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className='cart'>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div className="cart-item-box">
              <div className="cart-item-details">
                <strong>{item.name}</strong> - ${item.price}
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </div>
              <div>
                Cost: ${item.price * item.quantity}
              </div>
              <button onClick={() => handleRemoveItem(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-cost">
        Total Cost: ${totalCost.toFixed(2)}
      </div>
      
      <div className="address-details">
        <h2>Address Details</h2>
        <input type="text" placeholder="Street Address" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
        <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
        <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
        <input type="text" placeholder="Postal Code" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
      </div>

      <div className="payment-details">
        <h2>Payment Details</h2>
        <input type="text" placeholder="Card Number" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} pattern="\d{16}" maxLength="16" />
        <input type="text" placeholder="Expiry Date (MM/YYYY)" value={paymentDetails.expiryDate} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })} pattern="(0[1-9]|1[0-2])\/[0-9]{4}" />
        <input type="text" placeholder="CVV (3 digits)" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })} pattern="\d{3}" maxLength="3" />
      </div>

      <div className="cart-buttons">
        <button className='checkout' onClick={handleCheckout}>Checkout</button>
        <Link to="/">
          <button className='back-to-home'>Back to Home</button>
        </Link>
      </div>

      {/* Display ordered items */}
      <div className="orders">
        <h2>Ordered Items</h2>
        <ul>
          {orderedItems.map((item) => (
            <li key={item.id}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
