import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createActor } from '../redux/slices/actorSlice';

export default function ActorForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', gender: '', dob: '', bio: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createActor(form));
    setForm({ name: '', gender: '', dob: '', bio: '' });
  };

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      <h3>Add Actor</h3>
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
      <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
      <textarea placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <button type="submit">Add Actor</button>
    </form>
  );
}
