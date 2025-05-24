const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_BEARER_TOKEN = process.env.TMDB_API_KEY;

exports.fetchNowPlaying = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/account/22022184/favorite/movies`, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: 'application/json'
      },
      params: {
        language: 'en-US',
        page: 1,
        sort_by: 'created_at.asc'
      }
    });

    return response.data.results || [];
  } catch (err) {
    console.error('TMDB Favorite Movies Error:', err.response?.data || err.message);
    throw new Error('Failed to fetch favorite movies from TMDB');
  }
};
