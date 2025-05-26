import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingnupPage';
import NotFoundPage from './pages/NotFoundPage';

import { logout } from './redux/slices/authSlice';

export default function App() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar isLoggedIn={!!token} onLogout={() => dispatch(logout())} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={token ? <AddMoviePage /> : <Navigate to="/login" />} />
        <Route path="/movies/edit/:id" element={token ? <EditMoviePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
