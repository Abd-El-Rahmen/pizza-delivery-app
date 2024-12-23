import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  discount: 0.0,
  validCoupon: false,
};

const apiUrl = import.meta.env.VITE_API_URL;


export const getCoupon = createAsyncThunk(
  "/coupon/get-coupon",
  async ({ code, userId }) => {
    const response = await axios.get(`${apiUrl}/api/coupon/get-coupon`, {
      params: { code, userId },
    });
    return response?.data;
  }
);

const couponSlice = createSlice({
  name: "couponSlice",
  initialState,
  reducers: {
    setFalse:(state) => {
      state.validCoupon = false;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discount = action.payload.discount;
        state.validCoupon = action.payload.success;
      })
      .addCase(getCoupon.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {setFalse: setFalseAction} = couponSlice.actions;

export default couponSlice.reducer;
