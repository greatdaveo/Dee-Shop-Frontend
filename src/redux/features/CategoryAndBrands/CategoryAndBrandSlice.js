import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryAndBrandService from "./categoryAndBrandService";

const initialState = {
  category: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// For Create Category
export const createCategorySlice = createAsyncThunk(
  "category/create-category",
  async (formData, thunkApi) => {
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

export const categoryAndBrandSlice = createSlice({
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

  extraReducer: (builder) => {
    builder
      // For Create Category
      .addCase(createCategorySlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createCategorySlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Category created successfully!");
        console.log("Fulfilled created Category", action.payload);
      })

      .addCase(createCategorySlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_CAT } = categoryAndBrandSlice.actions;

export default categoryAndBrandSlice.reducer;
