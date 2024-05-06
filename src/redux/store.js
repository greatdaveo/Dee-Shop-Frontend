import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/CategoryAndBrands/CategoryAndBrandSlice";
import productReducer from "./features/products/productSlice";
import filteredReducer from "./features/products/filterSlice";
import couponReducer from "./features/coupon/CouponSlice";
import cartReducer from "./features/cart/cartSlice";
import checkoutReducer from "./features/checkout/checkoutSlice";
import orderReducer from "./features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    filter: filteredReducer,
    coupon: couponReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  },
});
