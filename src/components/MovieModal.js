import React, { useState } from 'react';

export default function MovieModal({ movie, onClose, isOwner }) {
  const [expanded, setExpanded] = useState(false);
  if (!movie) return null;

  const plot = movie.plot || movie.synopsis || 'No description available.';
  const words = plot.trim().split(/\s+/);
  const isLong = words.length > 10;
  const shortPlot = isLong ? words.slice(0, 10).join(' ') + '...' : plot;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>X</button>
        <h2>{movie.name || movie.title} ({movie.yearOfRelease || movie.release_date?.split('-')[0]})</h2>
        {movie.poster && <img src={movie.poster} alt={movie.name} />}
        {movie.producer && <p><strong>Producer:</strong> {movie.producer.name}</p>}
        {movie.actors && <p><strong>Actors:</strong> {movie.actors.map(a => a.name).join(', ')}</p>}
        
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

        {isOwner && <p><em>You uploaded this movie.</em></p>}
      </div>
    </div>
  );
}
