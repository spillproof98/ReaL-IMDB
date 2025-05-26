import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import { addMovie } from '../redux/slices/movieSlice';

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

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="form-container" style={{ position: 'relative' }}>
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#ff9800',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          fontWeight: 'bold',
          color: '#000',
          cursor: 'pointer'
        }}
      >
        X
      </button>

      <MovieForm onSubmit={handleSubmit} />
    </div>
  );
}
