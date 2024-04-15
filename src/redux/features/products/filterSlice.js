import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterService = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      // This is destructured from the payload sent from the frontend of the SHopProductList Component
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

    SORT_PRODUCTS(state, action) {
      // This is destructured from the payload sent from the frontend of the SHopProductList Component
      const { products, sort } = action.payload;
      let temporaryProducts = [];
      if (sort === "latest") {
        temporaryProducts = products;
      }

      if (sort === "lowest-price") {
        temporaryProducts = products.slice().sort((a, b) => {
          return a.discountedPrice - b.discountedPrice;
        });
      }

      if (sort === "highest-price") {
        temporaryProducts = products.slice().sort((a, b) => {
          return b.discountedPrice - a.discountedPrice;
        });
      }

      if (sort === "a-z") {
        temporaryProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "z-a") {
        temporaryProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      //   To update the filtered Product state
      state.filteredProducts = temporaryProducts;
    },

    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let temporaryProducts = [];
      if (category === "All") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = temporaryProducts;
    },

    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let temporaryProducts = [];
      if (brand === "All") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.brand === brand
        );
      }
      state.filteredProducts = temporaryProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
} = filterService.actions;

export const selectedFilteredProducts = (state) =>
  state.filter.filteredProducts;

export default filterService.reducer;
