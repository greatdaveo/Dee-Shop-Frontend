import React, { useState } from "react";
import "../../styles/auth/RegisterPage.css";
import NavBar from "../../components/homepage/NavBar";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, confirmPassword } = formData;

  const handleRegister = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
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
  );
};

export default RegisterPage;
