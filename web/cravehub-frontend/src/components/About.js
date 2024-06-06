import React from 'react';
import './About.css'; // Import CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Welcome to CraveHub - your ultimate food delivery app! We are dedicated to bringing delicious meals right to your doorstep, ensuring convenience and satisfaction with every order.
      </p>
      <h3>Contact Us</h3>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default About;
