import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Menu.css'; // Import Menu.css for styling
import Footer from './Footer';

const Menu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useContext(CartContext);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/fooditems')
            .then(response => {
                setFoodItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching food items:', error);
            });
    }, []);

    const filteredFoodItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToCart = (item) => {
        addToCart(item);
        setMessages(prevMessages => ({
            ...prevMessages,
            [item.id]: `${item.name} added to cart`
        }));
        setTimeout(() => {
            setMessages(prevMessages => ({
                ...prevMessages,
                [item.id]: ''
            }));
        }, 4000);
    };

    return (
        <div className="menu-container">
            <h1>Inspiration for your first order</h1>
            <div className="searchBox">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Search food items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="searchButton" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 29 29" fill="none">
  <g clip-path="url(#clip0_2_17)">
    <g filter="url(#filter0_d_2_17)">
      <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
    </g>
  </g>
  <defs>
    <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
      <feOffset dy="4"></feOffset>
      <feGaussianBlur stdDeviation="2"></feGaussianBlur>
      <feComposite in2="hardAlpha" operator="out"></feComposite>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
    </filter>
    <clipPath id="clip0_2_17">
      <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
    </clipPath>
  </defs>
</svg>
                </button>
            </div>
            <div className="food-items-container">
                {filteredFoodItems.map(item => (
                    <div className="food-item" key={item.id}>
                        <img className="food-item-image" src={item.image} alt={item.name} />
                        <div className="food-item-details">
                            <h2 className="food-item-name">{item.name}</h2>
                            <p className="food-item-description">{item.description}</p>
                            <p className="food-item-price">{item.price}</p>
                            <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            <Link to="/cart"> {/* Add Link component to navigate to cart page */}
                                <button className="go-to-cart-button">Go to Cart</button>
                            </Link>
                            {messages[item.id] && <p className="item-added-message">{messages[item.id]}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Menu;
