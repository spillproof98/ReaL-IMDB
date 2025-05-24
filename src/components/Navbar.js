import React from 'react';
import SearchBar from './SearchBar';
import logo from '../Assets/images/homelogo.png';

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <a href="/#/"><img src={logo} alt="IMDb Logo" height="30" /></a>
      <SearchBar />
      <div className="nav-links">
        <a href="/#/">Home</a>
        {isLoggedIn ? (
          <>
            <a href="/#/add">Upload Movie</a>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/#/login">Login</a>
            <a href="/#/signup">Sign Up</a>
          </>
        )}
      </div>
    </nav>
  );
}
