import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authenticatedUser } from "../redux/features/auth/authSlice";
import NavBar from "../components/homepage/NavBar";
import Footer from "../components/Footer";

const AdminOnlyRoute = ({ children }) => {
  const user = useSelector(authenticatedUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  } else {
    return (
      <div>
        <div style={{ background: "black" }}>
          <NavBar />
        </div>

        <div style={{ height: "40vh", padding: "5rem" }}>
          <div className="">
            <h1>Permission denied</h1>
            <p>This page can only be viewed by an admin user</p>
          </div>

          <Link to="/">
            <button
              className="btn"
              style={{ padding: "0.5rem", border: "none" }}
            >
              Go Back to Home Page
            </button>
          </Link>
        </div>

        <Footer />
      </div>
    );
  }
};

// For the Admin Only Link
export const AdminOnlyLink = ({ children }) => {
  const user = useSelector(authenticatedUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  }

  return null;
};

export default AdminOnlyRoute;
