import React, { useState } from "react";
import "../../styles/auth/LoginPage.css";
import NavBar from "../../components/homepage/NavBar";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <section className="login">
      <div className="nav">
        <NavBar />
      </div>

      <div className="form-cover">
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
        </form>

        <p>
          Don't have an account? <Link to="/register">Sign up 😁</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
