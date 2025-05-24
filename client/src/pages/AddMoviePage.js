import React from 'react';
import { useDispatch } from 'react-redux';
import MovieForm from '../components/MovieForm';
import { addMovie } from '../redux/slices/movieSlice';
import { useNavigate } from 'react-router-dom';

export default function AddMoviePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const resultAction = await dispatch(addMovie(formData));
      if (addMovie.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        console.error('Failed to add movie:', resultAction.error.message);
        alert('Movie upload failed.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="form-container">
      <MovieForm onSubmit={handleSubmit} />
    </div>
  );
}
