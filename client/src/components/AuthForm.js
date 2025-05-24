import React, { useState } from 'react';

export default function AuthForm({ onSubmit, type }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">{type === 'login' ? 'Login' : 'Sign Up'}</button>
    </form>
  );
}
