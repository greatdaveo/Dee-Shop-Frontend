import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderService from "./orderService";

const initialState = {
  order: null,
  orders: [],
  totalOrderAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// For Create Order
export const createOrderSlice = createAsyncThunk(
  "orders/create-order",
  async (formData, thunkAPI) => {
    try {
      return await orderService.createOrder(formData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To get All Orders
export const getAllOrdersSlice = createAsyncThunk(
  "orders/all-orders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();
      console.log(thunkAPI);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To get Single Order
export const getSingleOrderSlice = createAsyncThunk(
  "orders/single-order",
  async (id, thunkAPI) => {
    try {
      return await orderService.getSingleOrder(id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();
      console.log(thunkAPI);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderSlice.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createOrderSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        console.log(action.payload);
      })

      .addCase(createOrderSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log(action.payload);
      })

      // For Get All Orders
      .addCase(getAllOrdersSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllOrdersSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
        console.log("All Orders:", action.payload);
      })

      .addCase(getAllOrdersSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // For Get Single Order
      .addCase(getSingleOrderSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getSingleOrderSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
        console.log("Single Order:", action.payload);
      })

      .addCase(getSingleOrderSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
