import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProducer } from '../redux/slices/producerSlice';

export default function ProducerForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', gender: '', dob: '', bio: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProducer(form));
    setForm({ name: '', gender: '', dob: '', bio: '' });
  };

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      <h3>Add Producer</h3>
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
      <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
      <textarea placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <button type="submit">Add Producer</button>
    </form>
  );
}
