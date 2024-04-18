import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  fixedCartTotalAmount: 0,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // To get the index of the product
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        // If the item exist in cart, increase the cart quantity (When a product exist in cart)
        state.cartItems[productIndex].cartQuantity += 1;
        toast.success(`${action.payload.name} increased by 1!`, {
          position: "top-left",
        });
      } else {
        // If the item doesn't exist in the cart, it will create a new item in the cart (when a product is added to cart for the first time)
        const temporaryProduct = { ...action.payload, cartQuantity: 1 }; // Destructured the action.payload & created a new property with a default value of 1
        state.cartItems.push(temporaryProduct); // Update the cartItems with the new product added to cart
        toast.success(`${action.payload.name} added to cart!`, {
          position: "top-left",
        });
      }

      //   To save the cart to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
