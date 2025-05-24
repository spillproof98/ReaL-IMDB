import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../api/api';

export const fetchProducers = createAsyncThunk('producers/fetch', async () => {
  const res = await axios.get('/api/producers');
  return res.data;
});

const producerSlice = createSlice({
  name: 'producers',
  initialState: { producers: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducers.fulfilled, (state, action) => {
      state.producers = action.payload;
    });
  }
});

export default producerSlice.reducer;
