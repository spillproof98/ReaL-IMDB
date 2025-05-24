import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchMovies = createAsyncThunk('movies/fetch', async () => {
  const res = await API.get('/movies');
  return res.data;
});

export const addMovie = createAsyncThunk('movies/add', async (movie, { getState }) => {
  const token = getState().auth.token;
  const res = await API.post('/movies', movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
});

export const deleteMovie = createAsyncThunk('movies/delete', async (id, { getState }) => {
  const token = getState().auth.token;
  await API.delete(`/movies/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const movieSlice = createSlice({
  name: 'movie',
  initialState: { movies: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(m => m._id !== action.payload);
      });
  }
});

export default movieSlice.reducer;
