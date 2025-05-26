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
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    hydrate(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload?.message || "Signup failed";
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
