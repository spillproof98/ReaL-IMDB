import React from 'react';

export default function MovieCard({ movie, onClick }) {
  const posterUrl = movie.tmdb
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster || '/images/movie_page.png';

  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img
        src={posterUrl}
        alt={movie.name || movie.title}
        onError={(e) => { e.target.src = '/images/movie_page.png'; }}
        style={{
          width: '100%',
          height: '270px',
          objectFit: 'contain',
          borderRadius: '8px',
          backgroundColor: '#222',
        }}
      />
      <div className="info" style={{ paddingTop: '0.5rem' }}>
        <h2 style={{ fontSize: '1rem', color: '#ff9800', margin: '0.5rem 0' }}>
          {movie.name || movie.title} (
          {movie.yearOfRelease || movie.release_date?.split('-')[0]})
        </h2>
        {movie.producer && (
          <p style={{ margin: 0 }}>
            <strong>Producer:</strong> {movie.producer.name}
          </p>
        )}
        {movie.actors && movie.actors.length > 0 && (
          <p style={{ margin: 0 }}>
            <strong>Actors:</strong> {movie.actors.map(a => a.name).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
