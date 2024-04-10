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

function App() {
  axios.defaults.withCredentials = true;

  const { isLoggedIn, user } = useSelector((state) => state.auth);
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
