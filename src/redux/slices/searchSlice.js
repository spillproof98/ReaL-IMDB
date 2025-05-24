import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchQuery: (state, action) => action.payload
  }
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
