import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie } from '../redux/slices/movieSlice';

export default function MovieModal({ movie, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isOwner = movie?.uploaderId === user?._id;

  if (!movie) return null;

  const plot = movie.plot || movie.synopsis || 'No description available.';
  const words = plot.trim().split(/\s+/);
  const isLong = words.length > 10;
  const shortPlot = isLong ? words.slice(0, 10).join(' ') + '...' : plot;

  const handleEdit = () => {
    navigate(`/movies/edit/${movie._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await dispatch(deleteMovie(movie._id));
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">X</button>

        <h2>
          {movie.name || movie.title} (
          {movie.yearOfRelease || movie.release_date?.split('-')[0]})
        </h2>

        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.name}
            className="modal-poster"
          />
        )}

        {movie.producer && <p><strong>Producer:</strong> {movie.producer.name}</p>}
        {movie.actors?.length > 0 && (
          <p><strong>Actors:</strong> {movie.actors.map(a => a.name).join(', ')}</p>
        )}

        <p>
          <strong>Plot:</strong>{' '}
          {expanded || !isLong ? plot : shortPlot}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginLeft: '0.5rem',
                background: 'none',
                border: 'none',
                color: '#ff9800',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          )}
        </p>
        {isOwner && (
          <div className="modal-footer">
            <button className="modal-btn edit-btn" onClick={handleEdit}>Update</button>
            <button className="modal-btn delete-btn" onClick={handleDelete}>Delete Movie</button>
          </div>
        )}
      </div>
    </div>
  );
}
