import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const login = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const res = await API.post('/auth/login', formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const signup = createAsyncThunk('auth/signup', async (formData, thunkAPI) => {
  try {
    const res = await API.post('/auth/signup', formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload?.message || 'Signup failed';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
