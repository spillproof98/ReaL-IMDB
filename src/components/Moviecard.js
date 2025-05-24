import React from 'react';

export default function MovieCard({ movie, onClick }) {
  const posterUrl = movie.tmdb
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster || '/images/movie_page.png';

  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={posterUrl}
        alt={movie.name || movie.title}
        onError={(e) => { e.target.src = '/images/movie_page.png'; }}
      />
      <div className="info">
        <h2>
          {movie.name || movie.title} (
          {movie.yearOfRelease || movie.release_date?.split('-')[0]})
        </h2>
        {movie.producer && <p><strong>Producer:</strong> {movie.producer.name}</p>}
        {movie.actors && <p><strong>Actors:</strong> {movie.actors.map(a => a.name).join(', ')}</p>}
      </div>
    </div>
  );
}
