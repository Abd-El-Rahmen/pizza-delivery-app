import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  loading: false,
  pizzaList: [],
  pizzaDetails: null,
  allPizzas: [],
};

export const getRandomPizzas = createAsyncThunk(
  "/pizzas/getRandomPizzas",
  async () => {
    const response = await axios.get(`${apiUrl}/api/pizza/random`);
    return response.data;
  }
);

export const searchInPizzas = createAsyncThunk(
  "/pizzas/searchInPizzas",
  async (filterParams) => {
    const query = new URLSearchParams(filterParams);
    const response = await axios.get(`${apiUrl}/api/pizza/search?${query}`);

    return response.data;
  }
);

export const addPizza = createAsyncThunk(
  "/pizzas/addPizza",
  async (formData) => {
    const response = await axios.post(`${apiUrl}/api/Pizza/add`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  }
);

export const fetchAllPizzas = createAsyncThunk(
  "/pizzas/fetchAllPizzas",
  async (req, res) => {
    const response = await axios.get(`${apiUrl}/api/pizza/all`);
    return response?.data;
  }
);

export const updatePizza = createAsyncThunk(
  "/pizzas/update",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${apiUrl}/api/pizza/update/${id}`,
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

export const deletePizza = createAsyncThunk(
  "/pizzas/delete",
  async ({ id }) => {
    const response = await axios.delete(`${apiUrl}/api/pizza/delete/${id}`);
    return response?.data;
  }
);

const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomPizzas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRandomPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.pizzaList = action.payload.data;
      })
      .addCase(getRandomPizzas.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchInPizzas.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchInPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.pizzaList = action.payload.data;
      })
      .addCase(searchInPizzas.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllPizzas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.allPizzas = action.payload.data;
      })
      .addCase(fetchAllPizzas.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default pizzaSlice.reducer;
