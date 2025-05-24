import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../api/api';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const ACCOUNT_ID = '22022184';

export const fetchNowPlaying = createAsyncThunk(
  'tmdb/fetchNowPlaying',
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.results;
  }
);

const tmdbSlice = createSlice({
  name: 'tmdb',
  initialState: {
    nowPlaying: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlaying.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
        state.loading = false;
      })
      .addCase(fetchNowPlaying.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tmdbSlice.reducer;
