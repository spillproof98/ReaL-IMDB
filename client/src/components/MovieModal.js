import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMovie } from '../redux/slices/movieSlice';

export default function MovieModal({ movie, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = localStorage.getItem('user');
  const user = reduxUser || (storedUser ? JSON.parse(storedUser) : null);

  const uploaderId =
    typeof movie?.uploaderId === 'object'
      ? movie.uploaderId._id
      : movie?.uploaderId;

  const isOwner = user && String(uploaderId) === String(user._id);

  const [expanded, setExpanded] = useState(false);
  const plot = movie.plot || movie.synopsis || 'No description available.';
  const words = plot.trim().split(/\s+/);
  const isLong = words.length > 40;
  const shortPlot = isLong ? words.slice(0, 40).join(' ') + '...' : plot;

  const handleEdit = () => navigate(`/movies/edit/${movie._id}`);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await dispatch(deleteMovie(movie._id));
      onClose();
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split('T')[0] : 'N/A';

  if (!movie) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">X</button>

        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.name}
            className="modal-poster"
            onError={(e) => {
              if (!e.target.dataset.fallback) {
                e.target.dataset.fallback = 'true';
                e.target.src = '/images/movie_page.png';
              }
            }}
          />
        )}

        <h2 className="movie-title">
          {movie.name} ({movie.yearOfRelease || movie.release_date?.split('-')[0]})
        </h2>

        <div className="modal-section">
          <p>
            <strong>Plot:</strong> {expanded || !isLong ? plot : shortPlot}
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="modal-btn"
                style={{
                  background: 'none',
                  color: '#ff9800',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginLeft: '0.5rem'
                }}
              >
                {expanded ? 'See less' : 'See more'}
              </button>
            )}
          </p>
        </div>

        {movie.producer && (
          <div className="modal-section">
            <h4>Producer</h4>
            <p><strong>Name:</strong> {movie.producer.name}</p>
            <p><strong>Gender:</strong> {movie.producer.gender || 'N/A'}</p>
            <p><strong>DOB:</strong> {formatDate(movie.producer.dob)}</p>
            <p><strong>Bio:</strong> {movie.producer.bio || 'N/A'}</p>
          </div>
        )}

        {movie.actors && movie.actors.length > 0 && (
          <div className="modal-section">
            <h4>Actors</h4>
            {movie.actors.map((actor, i) => (
              <div key={i} className="modal-actor">
                <p><strong>Name:</strong> {actor.name}</p>
                <p><strong>Gender:</strong> {actor.gender || 'N/A'}</p>
                <p><strong>DOB:</strong> {formatDate(actor.dob)}</p>
                <p><strong>Bio:</strong> {actor.bio || 'N/A'}</p>
                {i !== movie.actors.length - 1 && <hr />}
              </div>
            ))}
          </div>
        )}

        {isOwner && (
          <div className="modal-actions" style={{ marginTop: '1rem' }}>
            <button onClick={handleEdit} style={{ marginRight: '1rem' }}>Edit</button>
            <button
              onClick={handleDelete}
              style={{ backgroundColor: '#d32f2f', color: 'white' }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
