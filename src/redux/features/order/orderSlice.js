import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderService from "./orderService";

const initialState = {
  order: null,
  order: [],
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
        console.log(action.payload);
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
