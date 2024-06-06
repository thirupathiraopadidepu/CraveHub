import React from 'react';

const AddressPopup = ({ onNext, onClose }) => {
  const handleNext = () => {
    // Perform validation of address fields if needed
    // Call onNext to proceed to the next step
    onNext();
  };

  return (
    <div className="address-popup">
      <h2>Enter Address</h2>
      {/* Address input fields */}
      <button onClick={handleNext}>Next</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddressPopup;
