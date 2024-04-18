import { createSlice } from "@reduxjs/toolkit";
import { getCartQuantityById } from "../../../utils";
import { toast } from "react-toastify";
// import {getCartQuantityById} from "..///"

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
      // To get the cart quantity by the id of a product
      const cartQuantity = getCartQuantityById(
        state.cartItems,
        action.payload._id
      );

      // To get the index of the product in the cart
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        //if the cartQuantity is equal to the quantity in the database
        if (cartQuantity === action.payload.quantity) {
          // To ensure the user doesn't add more than the available products to cart
          state.cartItems[productIndex].cartQuantity += 0;
          toast.info(`You can't add more than the quantity in stock`);
        } else {
          // If the item exist in cart, increase the cart quantity (When a product exist in cart)
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.name} increased by 1!`, {
            position: "top-left",
          });
        }
      } else {
        // If the item doesn't exist in the cart, it will create a new item in the cart (when a product is added to cart for the first time)
        const temporaryProduct = { ...action.payload, cartQuantity }; // Destructured the action.payload & created a new property with a default value of 1
        state.cartItems.push(temporaryProduct); // Update the cartItems with the new product added to cart
        toast.success(`${action.payload.name} added to cart!`, {
          position: "top-left",
        });
      }

      //   To save the cart to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state, action) {
      // To get the index of the product in the cart
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        // if the cart quantity is greater than 1
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} decreased by 1!`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        // if the cart quantity is equal to 1
        const newCartItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart!`, {
          position: "top-left",
        });
      }

      //   To save the cart item to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { ADD_TO_CART, DECREASE_CART } = cartSlice.actions;

export default cartSlice.reducer;
