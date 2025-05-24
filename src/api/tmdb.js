const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = process.env.REACT_APP_TMDB_API_KEY;

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchNowPlaying = async () => {
 try {
    const res = await fetch(
      'https://api.themoviedb.org/3/account/22022184/favorite/movies?language=en-US&page=1&sort_by=created_at.asc',
      { headers }
    );
    if (!res.ok) throw new Error(`TMDB Favorite Error ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error('Error fetching favorite movies:', err);
    return [];
  }
};