import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [mobile_number, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        mobile_number,
        password
      });
      console.log('Login successful:', response.data);
      // Store the phone number in local storage
      localStorage.setItem('phoneNumber', response.data.user.mobile_number);
      // Redirect to dashboard or perform other actions upon successful login
      window.location.href = '/'; // Redirect to the home page
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display error message)
    }
  };

  return (
    <div className="account">
      <div className="container">
        <h2 className="">Login</h2>
        <div className="form-container">
          <form className="form" onSubmit={handleLogin}>
            <input
              type="tel"
              className="input"
              placeholder="Mobile Number"
              value={mobile_number}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="page-link">
              <Link to="/forgot-password" className="page-link-label">Forgot Password?</Link>
            </p>
            <button type="submit" className="form-btn">Login</button>
          </form>
          <p className="sign-up-label">
            Don't have an account? <Link to="/signup" className="sign-up-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
