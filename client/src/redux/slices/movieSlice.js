import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchMovies = createAsyncThunk('movies/fetch', async () => {
  const res = await API.get('/movies');
  return res.data;
});

export const fetchMovieById = createAsyncThunk('movies/fetchById', async (id, { getState }) => {
  const token = getState().auth.token;
  const res = await API.get(`/movies/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

export const addMovie = createAsyncThunk('movies/add', async (movie, { getState }) => {
  const token = getState().auth.token;
  const res = await API.post('/movies', movie, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });
  return res.data;
});

export const updateMovie = createAsyncThunk('movies/update', async ({ id, formData }, { getState }) => {
  const token = getState().auth.token;
  const res = await API.put(`/movies/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
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

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })

      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })

      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(m => m._id !== action.payload);
      })

      .addCase(fetchMovieById.fulfilled, (state, action) => {
        const existing = state.movies.find(m => m._id === action.payload._id);
        if (!existing) {
          state.movies.push(action.payload);
        } else {
          Object.assign(existing, action.payload);
        }
      });
  },
});

export default movieSlice.reducer;
