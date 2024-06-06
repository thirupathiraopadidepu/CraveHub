import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'; // Assuming you have SignUp.css for styling
import axios from 'axios';

function SignUp() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // State variable for signup success

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        mobile_number: mobileNumber,
        password: password
      });
      console.log('Sign up successful:', response.data);
      setSignupSuccess(true); // Set signup success state to true
      // Optionally, you can redirect to another page or perform other actions here
    } catch (error) {
      console.error('Sign up failed:', error);
      // Handle sign up failure (e.g., display error message)
    }
  };

  return (
    <div className="account">
      <div className="container">
        <h2 className="">Sign Up</h2>
        <div className="form-container">
          {!signupSuccess ? ( // Render signup form if signup is not successful
            <form className="form" onSubmit={handleSignUp}>
              <input
                type="tel"
                className="input"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="form-btn">Sign Up</button>
            </form>
          ) : (
            // Render success message if signup is successful
            <div className="success-message">
              <p>Sign up successful!</p>
              <p>Redirecting to login page...</p>
            </div>
          )}
          <p className="sign-in-label">
            Already have an account? <Link to="/login" className="sign-in-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
