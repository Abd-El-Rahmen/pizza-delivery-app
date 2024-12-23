import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  isLoading: false,
  successPayment: false,
  orderList: [],
  allOrders:[]
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(`${apiUrl}/api/order/create`, orderData);
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
    "/order/getAllOrdersByUserId",
    async (userId) => {
      const response = await axios.get(
        `${apiUrl}/api/order/list/${userId}`
      );
  
      return response.data;
    }
  );

export const getAllOrders = createAsyncThunk(
    "/order/getAllOrders",
    async () => {
      const response = await axios.get(
        `${apiUrl}/api/order/all`
      );
      return response.data;
    }
  );

  export const updateOrderStatus = createAsyncThunk(
    "/order/updateOrderStatus",
    async ({ orderId,status }) => {
      const response = await axios.put(
        `${apiUrl}/api/order/update`,
        {orderId,status}
      );
      
      return response.data;
    }
  );


const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setSuccessPayment: (state) => {
      state.successPayment = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successPayment = action.payload.success;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrders = action.payload.data;
        
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.allOrders = [];
      });
  },
});

export const { setSuccessPayment: setFalseSuccess } =
  orderSlice.actions;

export default orderSlice.reducer;
