// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cart from './components/Cart'; // Import the Cart component
import Menu from './components/Menu';
import About from './components/About'



const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart cartItems={[]} />} />
          <Route path="/menu" element={<Menu/>} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
