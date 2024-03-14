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
import { useDispatch } from "react-redux";
import { loginStatusSlice } from "./redux/features/auth/authSlice";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();

  // This is to check if the user is logged in
  useEffect(() => {
    dispatch(loginStatusSlice());
  }, [dispatch]);

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
