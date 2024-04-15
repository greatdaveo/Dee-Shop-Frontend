import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterService = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      // This is destructured from the payload sent from the frontend
      const { products, search } = action.payload;
      //   This will check if there is a product with the searched name or if there is a category for it
      const temporaryProducts = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(search.toLowerCase()) ||
          product.category?.toLowerCase().includes(search.toLowerCase())
      );
      //   To update the filtered Product state
      state.filteredProducts = temporaryProducts;
    },
  },
});

export const { FILTER_BY_SEARCH } = filterService.actions;
export const selectedFilteredProducts = (state) =>
  state.filter.filteredProducts;

export default filterService.reducer;
