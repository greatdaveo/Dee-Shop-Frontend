import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/CategoryAndBrands/CategoryAndBrandSlice";
import productReducer from "./features/products/productSlice";
import filteredReducer from "./features/products/filterSlice";
import couponReducer from "./features/coupon/CouponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    filter: filteredReducer,
    coupon: couponReducer,
  },
});
