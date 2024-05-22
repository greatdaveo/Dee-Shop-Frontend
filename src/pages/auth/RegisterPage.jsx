import React, { useEffect, useState } from "react";
import "../../styles/auth/RegisterPage.css";
import NavBar from "../../components/homepage/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, registerSlice } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer";
import { authWithGoogle } from "../../../firebase/firebase";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, confirmPassword } = formData;
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, confirmPassword);

    if (!email || !password) return toast.error("All fields are required!");
    if (password.length < 6) {
      return toast.error("Password must be 6 characters!");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email!");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const userData = { name, email, password };

    await dispatch(registerSlice(userData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

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
        navigate("/login");
        toast.success("Registration Successful!");
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

      <section className="register">
        <div className="nav">
          <NavBar />
        </div>

        <div className="form-cover">
          <h4 style={{ textAlign: "center", color: "gray" }}>
            Create an account
          </h4>

          <form className="form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button className="btn">Register</button>
            <p style={{ textAlign: "center", margin: "0" }}>
              <hr />
            </p>

            <button className="g-btn" onClick={handleGoogleAuth}>
              <i class="fa-brands fa-google"></i> Sign Up with Google
            </button>
          </form>

          <p style={{ fontSize: "0.8rem" }}>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegisterPage;
