import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "./productService";

const initialState = {
  product: null,
  products: [],
  minPrice: null,
  maxPrice: null,
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// For Get All Products
export const createProductSlice = createAsyncThunk(
  "products/create-product",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Get All Products
export const getAllProductsSlice = createAsyncThunk(
  "products/all-products",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Get All Products
export const deleteProductSlice = createAsyncThunk(
  "products/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For Create Product
      .addCase(createProductSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createProductSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        toast.success("Product created successfully!");
        // console.log("Fulfilled created products:", action.payload);
      })

      .addCase(createProductSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Error Creating Product:", action.payload);
      })

      // For Get All Product
      .addCase(getAllProductsSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllProductsSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        // console.log("Fulfilled products fetched:", action.payload);
      })

      .addCase(getAllProductsSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Error Creating Product:", action.payload);
      })

      // For Delete Product
      .addCase(deleteProductSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteProductSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully!");
        // console.log("Fulfilled products fetched:", action.payload);
      })

      .addCase(deleteProductSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Error Creating Product:", action.payload);
      });
  },
});

export default productSlice.reducer;
