import React, { useState } from 'react';

const PaymentDetails = ({ onOrder, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');

  const handleOrder = () => {
    // Perform validation of payment details if needed
    // Call onOrder to place the order
    onOrder();
  };

  return (
    <div className="payment-details">
      <h2>Payment Details</h2>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="UPI">UPI</option>
        <option value="Credit Card">Credit Card</option>
        {/* Add more payment options if needed */}
      </select>
      {/* Payment details input fields */}
      <button onClick={handleOrder}>Order</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PaymentDetails;
