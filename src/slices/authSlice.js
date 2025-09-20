import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  token: null,
  publicAddress: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ publicAddress, signature }, thunkApi) => {
    try {
      const res = await api.post("auth/login", { publicAddress, signature });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.publicAddress = null;
      state.loading = false;
      state.error = null;
      // clear persisted storage (redux-persist default = localStorage)
      localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.publicAddress = action.payload.publicAddress;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

// Selectors
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthAddress = (state) => state.auth.publicAddress;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
