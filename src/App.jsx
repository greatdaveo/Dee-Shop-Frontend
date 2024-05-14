import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SharedLayout from "./components/SharedLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSlice, loginStatusSlice } from "./redux/features/auth/authSlice";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminPage from "./pages/admin/AdminPage";
import AdminOnlyRoute from "./protectedRoute/AdminOnlyRoute";
import PageNotFound from "./pages/404/PageNotFound";
import ShopProductsPage from "./pages/shop/ShopProductsPage";
import ProductDetails from "./components/admin/product/productDetaills/ProductDetails";
import CartPage from "./pages/cart/CartPage";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/order/OrderHistory";
import OrderDetails from "./pages/order/OrderDetails";

import Checkout from "./pages/checkout/Checkout";
import CheckoutWithFlutterwave from "./pages/checkout/CheckoutWithFlutterwave";
import Loader from "./components/Loader/Loader";

function App() {
  axios.defaults.withCredentials = true;

  const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // This is to check if the user is logged in
  useEffect(() => {
    dispatch(loginStatusSlice());
  }, [dispatch]);

  // To deal with the loading effect of the login status
  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUserSlice());
    }
  }, [dispatch, isLoggedIn, user]);

  // {isLoading && <Loader />}

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<SharedLayout />} />
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shop" element={<ShopProductsPage />} />
          <Route
            path="/shop/product-details/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/checkout-stripe" element={<Checkout />} />
          <Route
            path="/checkout-flutterwave"
            element={<CheckoutWithFlutterwave />}
          />

          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <AdminPage />
              </AdminOnlyRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
