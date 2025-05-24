import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../api/api';

export const fetchActors = createAsyncThunk('actors/fetch', async () => {
  const res = await axios.get('/api/actors');
  return res.data;
});

const actorSlice = createSlice({
  name: 'actors',
  initialState: { actors: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActors.fulfilled, (state, action) => {
      state.actors = action.payload;
    });
  }
});

export default actorSlice.reducer;
