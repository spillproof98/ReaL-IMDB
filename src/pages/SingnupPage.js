import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(form)).then(() => navigate('/'));
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        <p style={{ color: 'white', marginTop: '1rem' }}>
          Already registered? <Link to="/login" style={{ color: '#ff9800' }}>Login</Link>
        </p>
      </form>
    </div>
  );
}
