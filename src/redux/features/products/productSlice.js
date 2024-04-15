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

// To Delete a Product
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

// To Edit a Product
export const editProductSlice = createAsyncThunk(
  "products/edit-product",
  async (id, thunkAPI) => {
    try {
      return await productService.editProduct(id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Update a Product
export const updateProductSlice = createAsyncThunk(
  "products/update-product/",
  async ({ id, formData }, thunkAPI) => {
    // console.log(id, formData);
    try {
      return await productService.updateProduct(id, formData);
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
  reducers: {
    RESET_PROD(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },

    // TO FILTER BY PRICE RANG
    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;
      const array = [];
      products.map((product) => {
        // To get the products prices
        const price = product.discountedPrice;
        return array.push(price); // this will push all the prices of the products to the array
      });
      // To get the Max & Min Priced
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
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
      })

      // For Edit Product
      .addCase(editProductSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editProductSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // This is a single product and not the array of all the products
        state.product = action.payload;
        // console.log("Fulfilled products fetched for editing:", action.payload);
      })

      .addCase(editProductSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Error Creating Product:", action.payload);
      })

      // For Update the Products list Edited Product
      .addCase(updateProductSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateProductSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully!!!");
        console.log(
          "Fulfilled products updated after editing:",
          action.payload
        );
      })

      .addCase(updateProductSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Error Creating Product:", action.payload);
      });
  },
});

// To export the single product for editing
export const singleProduct = (state) => state.product.product;

// To export the reducer function
export const { GET_PRICE_RANGE } = productSlice.actions;

export default productSlice.reducer;
