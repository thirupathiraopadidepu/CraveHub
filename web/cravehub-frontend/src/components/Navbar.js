import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const Navbar = () => {
    const { cartItems } = useContext(CartContext);
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const phoneNumber = localStorage.getItem('phoneNumber');

    const handleLogout = () => {
        localStorage.removeItem('phoneNumber');
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__left">
                    <Link to="/" className="navbar__logo">
                        <img src="https://res.cloudinary.com/dqgfk61lv/image/upload/v1714720314/Logocravehub_ya10lj.jpg" alt="CraveHub Logo" className="logo-image" />
                    </Link>
                </div>
                <div className="navbar__center">
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link to="/" className="navbar__link">Home</Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/menu" className="navbar__link">Menu</Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/about" className="navbar__link">About</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar__right">
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link to="/cart" className="navbar__link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                </svg>
                                ({cartItemCount}) Cart
                            </Link>
                        </li>
                        {phoneNumber ? (
                            <li className="navbar__item">
                                <button onClick={handleLogout} className="navbar__link">Logout</button>
                            </li>
                        ) : (
                            <React.Fragment>
                                <li className="navbar__item">
                                    <Link to="/login" className="navbar__link">Login</Link>
                                </li>
                                <li className="navbar__item">
                                    <Link to="/signup" className="navbar__link">Sign Up</Link>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
