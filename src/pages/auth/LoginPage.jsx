import React, { useEffect, useState } from "react";
import "../../styles/auth/LoginPage.css";
import NavBar from "../../components/homepage/NavBar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, loginSlice } from "../../redux/features/auth/authSlice";
import Footer from "../../components/Footer";
import {
  getCartDBSlice,
  saveCartDBSlice,
} from "../../redux/features/cart/cartSlice";
import Loader from "../../components/Loader/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  // This is to get the redirect params if the user tries to checkout without being logged in
  const [urlParams] = useSearchParams();
  const redirect = urlParams.get("redirect");
  // console.log(urlParams.get("redirect"));

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return toast.error("All fields are required!");

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email!");
    }

    const userData = { email, password };
    // console.log(userData);

    await dispatch(loginSlice(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      if (redirect === "cart") {
        // To sync & save the user's cart to the database immediately the user logs in
        dispatch(
          saveCartDBSlice({
            cartItems: JSON.parse(localStorage.getItem("cartItems")),
          })
        );
        return navigate("/cart");
      }
      navigate("/");
      dispatch(getCartDBSlice()); // This has been re-written in  cartSlice
    }

    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate, redirect]);

  // FOR GOOGLE AUTH
  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    try {
      const { access_token } = await authWithGoogle();
      console.log("Google Access Token:", access_token);

      let formData = { access_token };

      const response = await fetch(
        `${import.meta.env.VITE_Backend_Url}/api/user/google-auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to authenticate with Google");
      } else {
        navigate("/create-blog");
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      toast.error(err);
      return console.log(err);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      <section className="login">
        <div className="nav">
          <NavBar />
        </div>

        <div className="form-cover">
          <h4 style={{ textAlign: "center", color: "gray" }}>
            Login to you account
          </h4>

          <form className="form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn">Login</button>
            <p style={{ textAlign: "center", margin: "0" }}>
              <hr />
            </p>

            <button className="g-btn" onClick={handleGoogleAuth}>
              <i class="fa-brands fa-google"></i> Sign In with Google
            </button>
          </form>

          <p style={{ fontSize: "0.8rem" }}>
            Don't have an account? <Link to="/register">Sign up </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoginPage;
