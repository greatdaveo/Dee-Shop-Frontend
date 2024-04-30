import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import couponService from "./CouponService";

const initialState = {
  coupon: null,
  coupons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// For Create Coupon
export const createCouponSlice = createAsyncThunk(
  "category/create-coupon",
  async (formData, thunkAPI) => {
    try {
      return await couponService.createCoupon(formData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To get All Coupons
export const getAllCouponSlice = createAsyncThunk(
  "coupon/all-coupons",
  async (_, thunkAPI) => {
    try {
      return await couponService.getAllCoupons();
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

// To get Single Coupon
export const getSingleCouponSlice = createAsyncThunk(
  "coupon/single-coupon",
  async (couponName, thunkAPI) => {
    try {
      return await couponService.getSingleCoupon(couponName);
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

// To Delete a Coupon
export const deleteCouponSlice = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const CouponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    REMOVE_COUPON(state, action) {
      state.coupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // For Create Coupon
      .addCase(createCouponSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createCouponSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
        toast.success("Coupon created successfully!");
        // console.log("Fulfilled created coupon:", action.payload);
      })

      .addCase(createCouponSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // For Get All Coupons
      .addCase(getAllCouponSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllCouponSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
        // console.log("All Coupons:", action.payload);
      })

      .addCase(getAllCouponSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // For Get Single Coupon
      .addCase(getSingleCouponSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getSingleCouponSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupon = action.payload;
        toast.success("Coupon applied!");
        // console.log("Single Coupons:", action.payload);
      })

      .addCase(getSingleCouponSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // For Get Single Coupon
      .addCase(deleteCouponSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteCouponSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        // console.log("Deleted Coupon result:", action.payload);
      })

      .addCase(deleteCouponSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { REMOVE_COUPON } = CouponSlice.actions;

export default CouponSlice.reducer;
