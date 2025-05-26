import React, { useState, useEffect } from 'react';

export default function MovieForm({
  title = "Add New Movie",
  movie = null,
  onSubmit,
  onDelete,
  submitText = "Save Movie"
}) {
  const [form, setForm] = useState({
    name: '',
    yearOfRelease: '',
    plot: '',
    poster: null,
    producer: { name: '', bio: '', gender: '', dob: '' }
  });

  const [actors, setActors] = useState([
    { name: '', bio: '', gender: '', dob: '' }
  ]);

  useEffect(() => {
    if (movie) {
      setForm({
        name: movie.name || '',
        yearOfRelease: movie.yearOfRelease || '',
        plot: movie.plot || '',
        poster: null,
        producer: movie.producer || { name: '', bio: '', gender: '', dob: '' }
      });
      setActors(movie.actors || []);
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      setForm(prev => ({ ...prev, poster: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProducerChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      producer: { ...prev.producer, [name]: value }
    }));
  };

  const handleActorChange = (index, field, value) => {
  setActors(prevActors =>
    prevActors.map((actor, i) =>
      i === index ? { ...actor, [field]: value } : { ...actor }
    )
  );
  };


  const handleAddActor = () => {
    setActors([...actors, { name: '', bio: '', gender: '', dob: '' }]);
  };

  const handleRemoveActor = (index) => {
    const updated = [...actors];
    updated.splice(index, 1);
    setActors(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('yearOfRelease', form.yearOfRelease);
    formData.append('plot', form.plot);
    if (form.poster) formData.append('poster', form.poster);
    formData.append('producer', JSON.stringify(form.producer));
    formData.append('actors', JSON.stringify(actors));
    onSubmit(formData);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>{title}</h2>

      <label>Movie Name</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>Release Year</label>
      <input name="yearOfRelease" value={form.yearOfRelease} onChange={handleChange} />

      <label>Movie Plot</label>
      <textarea name="plot" value={form.plot} onChange={handleChange} />

      <label>Poster</label>
      <input type="file" name="poster" onChange={handleChange} />

      <h3>Producer Info</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.producer.name}
        onChange={handleProducerChange}
      />
      <input
        name="bio"
        placeholder="Bio"
        value={form.producer.bio}
        onChange={handleProducerChange}
      />
      <input
        name="gender"
        placeholder="Gender"
        value={form.producer.gender}
        onChange={handleProducerChange}
      />
      <input
        type="date"
        name="dob"
        value={form.producer.dob}
        onChange={handleProducerChange}
      />

      <h3>Actors</h3>
      {actors.map((actor, i) => (
        <div className="form-row" key={i}>
          <input
            placeholder="Name"
            value={actor.name}
            onChange={(e) => handleActorChange(i, 'name', e.target.value)}
          />
          <input
            placeholder="Bio"
            value={actor.bio}
            onChange={(e) => handleActorChange(i, 'bio', e.target.value)}
          />
          <input
            placeholder="Gender"
            value={actor.gender}
            onChange={(e) => handleActorChange(i, 'gender', e.target.value)}
          />
          <input
            type="date"
            value={actor.dob}
            onChange={(e) => handleActorChange(i, 'dob', e.target.value)}
          />
          {actors.length > 1 && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveActor(i)}
              title="Remove Actor"
            >
              ❌
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddActor}>Add Actor</button>
      <button type="submit">{submitText}</button>

      {onDelete && (
        <button
          type="button"
          className="delete-movie-btn"
          onClick={onDelete}
        >
          Delete Movie
        </button>
      )}
    </form>
  );
}
