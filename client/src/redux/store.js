import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';
import actorReducer from './slices/actorSlice';
import producerReducer from './slices/producerSlice';
import tmdbReducer from './slices/tmdbSlice';
import searchReducer from './slices/searchSlice'

export const store = configureStore({
reducer: {
  auth: authReducer,
  movie: movieReducer,
  actors: actorReducer,
  producers: producerReducer,
  tmdb: tmdbReducer,
  search: searchReducer,
},
});
