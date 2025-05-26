import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovieById,
  updateMovie,
  deleteMovie
} from '../redux/slices/movieSlice';

import MovieForm from '../components/MovieForm';

export default function EditMoviePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movie = useSelector(state =>
    state.movie.movies.find(m => m._id === id)
  );

  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      if (!movie) {
        const result = await dispatch(fetchMovieById(id));
        if (fetchMovieById.rejected.match(result)) {
          alert('Failed to load movie.');
          navigate('/');
          return;
        }
      }
      setLoading(false);
    };

    loadMovie();
  }, [dispatch, id, movie, navigate]);

  const handleSubmit = async (formData) => {
    const result = await dispatch(updateMovie({ id, formData }));
    if (updateMovie.fulfilled.match(result)) {
      navigate('/');
    } else {
      alert('Failed to update movie');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this movie?')) {
      const result = await dispatch(deleteMovie(id));
      if (deleteMovie.fulfilled.match(result)) {
        navigate('/');
      } else {
        alert('Failed to delete movie');
      }
    }
  };

  const isOwner = user && String(movie?.uploaderId?._id || movie?.uploaderId) === String(user._id);



  if (loading || !movie) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading...</p>;
  }

  return (
    <div className="form-container" style={{ position: 'relative' }}>
      <button
        onClick={() => navigate('/')}
        className="modal-close-btn"
        title="Close"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#ff9800',
          color: '#000',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          cursor: 'pointer'
        }}
      >
        X
      </button>

      {isOwner ? (
        <MovieForm
          title="Edit Movie"
          movie={movie}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          submitText="Update"
        />
      ) : (
        <p style={{ textAlign: 'center', color: 'orange', fontWeight: 'bold' }}>
          You are not authorized to edit this movie.
        </p>
      )}
    </div>
  );
}
