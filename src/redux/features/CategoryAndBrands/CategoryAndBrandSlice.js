import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryAndBrandService from "./categoryAndBrandService";

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// For Create Category
export const createCategorySlice = createAsyncThunk(
  "category/create-category",
  async (formData, thunkAPI) => {
    try {
      return await categoryAndBrandService.createCategory(formData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To get All Category
export const getAllCategorySlice = createAsyncThunk(
  "category/all-categories",
  async (_, thunkAPI) => {
    try {
      return await categoryAndBrandService.getAllCategories();
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

const categoryAndBrandSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_CAT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // For Create Category
      .addCase(createCategorySlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createCategorySlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        toast.success("Category created successfully!");
        // console.log("Fulfilled created Category:", action.payload);
      })

      .addCase(createCategorySlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // To Get All Category
      .addCase(getAllCategorySlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllCategorySlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        // console.log("All categories", action.payload);
      })

      .addCase(getAllCategorySlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Unable to fetch categories!", action.payload);
      });
  },
});

export const { RESET_CAT } = categoryAndBrandSlice.actions;

export default categoryAndBrandSlice.reducer;
