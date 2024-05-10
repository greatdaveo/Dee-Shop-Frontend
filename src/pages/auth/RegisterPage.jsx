import React, { useEffect, useState } from "react";
import "../../styles/auth/RegisterPage.css";
import NavBar from "../../components/homepage/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, registerSlice } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader/Loader";

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

  return (
    <div>
      {isLoading && <Loader />}

      <section className="register">
        <div className="nav">
          <NavBar />
        </div>

        <div className="form-cover">
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
          </form>

          <p>
            Already have an account? <Link to="/login">Sign In 😁</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
