import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  allUsers: [],
  getUsersLoading: false,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(`${apiUrl}/api/auth/register`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "/auth/deleteUser",
  async ({ id }) => {
    const response = await axios.delete(
      `${apiUrl}/api/auth/delete-user/${id}`
    );
    return response?.data;
  }
);


export const getAllUsers = createAsyncThunk(
  "/auth/allUsers",
  async (req, res) => {
    const response = await axios.get(`${apiUrl}/api/auth/allUsers`);
    
    return response?.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(`${apiUrl}/api/auth/login`, formData, {
    withCredentials: true,
  });
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${apiUrl}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const editUserInfo = createAsyncThunk(
  "auth/edit",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${apiUrl}/api/auth/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(`${apiUrl}/api/auth/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.getUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getUsersLoading = false;
        state.allUsers = action.payload.data
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.getUsersLoading = false;
      });
  },
});

export default authSlice.reducer;
