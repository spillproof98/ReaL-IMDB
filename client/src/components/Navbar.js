import React from 'react';
import SearchBar from './SearchBar';
import logo from '../Assets/images/homelogo.png';

const base = '/ReaL-IMDB/#';

export default function Navbar({ isLoggedIn, onLogout }) {
  const makeHref = (path = '') => `${base}${path}`;

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <a href={makeHref('/')}>
        <img src={logo} alt="IMDb Logo" height="30" />
      </a>
      <SearchBar />
      <div className="nav-links">
        <a href={makeHref('/')}>Home</a>
        {isLoggedIn ? (
          <>
            <a href={makeHref('/add')}>Upload Movie</a>
            <button onClick={onLogout} aria-label="Logout">Logout</button>
          </>
        ) : (
          <>
            <a href={makeHref('/login')}>Login</a>
            <a href={makeHref('/signup')}>Sign Up</a>
          </>
        )}
      </div>
    </nav>
  );
}
