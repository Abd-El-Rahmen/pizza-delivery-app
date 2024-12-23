import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, pizzaId, quantity, selectedVariant }) => {
    
    const response = await axios.post(`${apiUrl}/api/cart/add`, {
      userId,
      pizzaId,
      quantity,
      selectedVariant,
    });
    
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, pizzaId }) => {
    
    const response = await axios.delete(
      `${apiUrl}/api/cart/delete/${userId}/${pizzaId}`
    );
    return response.data;
  }
);

export const fetchAllItems = createAsyncThunk(
  "/cart/allItems",
  async (userId) => {
    const response = await axios.get(`${apiUrl}/api/cart/all/${userId}`);
    return response?.data?.data;
  }
);

const cartSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setEmptyCart:(state,action) => {
      state.cartItems = []
  }
  },
  extraReducers: (builder) =>
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.items;
      })
      .addCase(fetchAllItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const {setEmptyCart: setEmptyCartAction} = cartSlice.actions;

export default cartSlice.reducer;
