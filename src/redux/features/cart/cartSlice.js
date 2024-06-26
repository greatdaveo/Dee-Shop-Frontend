import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQuantityById } from "../../../utils";
import { toast } from "react-toastify";
import cartService from "./cartService";

const FRONTEND_URL = import.meta.env.VITE_Frontend_Url;

// Apply discount to cart
function applyDiscount(cartTotalAmount, discountPercentage) {
  var discountAmount = (discountPercentage / 100) * cartTotalAmount;
  var updatedTotal = cartTotalAmount - discountAmount;
  return updatedTotal;
}

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  initialCartTotalAmount: 0,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// For Create and save Cart in DB
export const saveCartDBSlice = createAsyncThunk(
  "cart/save-cart",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.saveCartToDB(cartData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// For Get Cart
export const getCartDBSlice = createAsyncThunk(
  "cart/get-cart",
  async (_, thunkAPI) => {
    try {
      return await cartService.getCartDB();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

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

    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart!`, {
        position: "top-left",
      });

      //   To save the cart item to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success("Cart cleared!", {
        position: "top-left",
      });

      //   To save the cart item to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // To calculate the total cart
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });

      // To add all the the quantity
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalQuantity = totalQuantity;

      //   To save the cart item to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // To calculate the total amount
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { discountedPrice, cartQuantity } = item;
        const cartItemAmount = discountedPrice * cartQuantity;
        return array.push(cartItemAmount);
      });

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.initialCartTotalAmount = totalAmount;
      // These are used for the cart summary at the CartPage 
      if (action.payload && action.payload.coupon !== null) {
        const discountedTotalAmount = applyDiscount(
          totalAmount,
          action.payload.coupon.discount
        );
        state.cartTotalAmount = discountedTotalAmount;
      } else {
        state.cartTotalAmount = totalAmount;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // For Save Cart DB
      .addCase(saveCartDBSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(saveCartDBSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        // console.log("Fulfilled created cart:", action.payload);
      })

      .addCase(saveCartDBSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // console.log("Error Creating Cart:", action.payload);
      })

      // For Get Cart in  DB
      .addCase(getCartDBSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getCartDBSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
        // When the user login this is to check if the user has an cart item saved in the DB
        // if the cart is greater than 0, navigate the user to the cart page
        if (action.payload.length > 0) {
          window.location.href = FRONTEND_URL + "/cart";
        } else {
          // if the cart is empty, navigate the user to the home page
          window.location.href = FRONTEND_URL;
        }
        // console.log("Fulfilled cart from DB:", action.payload);
      })

      .addCase(getCartDBSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // console.log("Error get Cart:", action.payload);
      });
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
} = cartSlice.actions;

export default cartSlice.reducer;
