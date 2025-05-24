import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slices/movieSlice';
import { fetchNowPlaying } from '../redux/slices/tmdbSlice';
import MovieCard from '../components/Moviecard';
import MovieModal from '../components/MovieModal';

export default function HomePage() {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(state => state.movie);
  const { nowPlaying } = useSelector(state => state.tmdb);
  const { token } = useSelector(state => state.auth);
  const searchQuery = useSelector(state => state.search);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [uploadedPage, setUploadedPage] = useState(0);
  const [tmdbPage, setTmdbPage] = useState(0);
  const moviesPerPage = 6;

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchNowPlaying());
  }, [dispatch]);

  useEffect(() => {
    setUploadedPage(0);
  }, [searchQuery]);

  let userId = null;
  if (token && token.split('.').length === 3) {
    try {
      userId = JSON.parse(atob(token.split('.')[1])).id;
    } catch {
      userId = null;
    }
  }

  const filteredMovies = movies.filter(movie => {
    const q = searchQuery?.toLowerCase();
    return (
      movie.name?.toLowerCase().includes(q) ||
      movie.producer?.name?.toLowerCase().includes(q) ||
      (movie.actors || []).some(actor =>
        actor?.name?.toLowerCase().includes(q)
      )
    );
  });

  const paginatedUploaded = filteredMovies.slice(
    uploadedPage * moviesPerPage,
    uploadedPage * moviesPerPage + moviesPerPage
  );
  const paginatedTmdb = nowPlaying.slice(
    tmdbPage * moviesPerPage,
    tmdbPage * moviesPerPage + moviesPerPage
  );

  const uploadedPageCount = Math.ceil(filteredMovies.length / moviesPerPage);
  const tmdbPageCount = Math.ceil(nowPlaying.length / moviesPerPage);

  return (
    <div>
      <h2>Uploaded Movies</h2>
      <div className="movie-list">
        {loading ? 'Loading...' : paginatedUploaded.map(movie => (
          <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>
      <Pagination
        page={uploadedPage}
        pageCount={uploadedPageCount}
        setPage={setUploadedPage}
      />

      <h2>Now Playing (TMDB)</h2>
      <div className="movie-list">
        {paginatedTmdb.map(movie => (
          <MovieCard key={movie.id} movie={{ ...movie, tmdb: true }} />
        ))}
      </div>
      <Pagination
        page={tmdbPage}
        pageCount={tmdbPageCount}
        setPage={setTmdbPage}
      />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isOwner={selectedMovie?.user === userId}
        />
      )}
    </div>
  );
}

function Pagination({ page, pageCount, setPage }) {
  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>« Prev</button>
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={i === page ? 'active' : ''}
        >
          {i + 1}
        </button>
      ))}
      <button disabled={page === pageCount - 1} onClick={() => setPage(p => p + 1)}>Next »</button>
    </div>
  );
}
