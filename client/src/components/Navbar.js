import React from 'react';
import SearchBar from './SearchBar';
import logo from '../Assets/images/homelogo.png';

const base = '/ReaL-IMDB/#';

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <a href={`${base}/`}><img src={logo} alt="IMDb Logo" height="30" /></a>
      <SearchBar />
      <div className="nav-links">
        <a href={`${base}/`}>Home</a>
        {isLoggedIn ? (
          <>
            <a href={`${base}/add`}>Upload Movie</a>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <a href={`${base}/login`}>Login</a>
            <a href={`${base}/signup`}>Sign Up</a>
          </>
        )}
      </div>
    </nav>
  );
}
