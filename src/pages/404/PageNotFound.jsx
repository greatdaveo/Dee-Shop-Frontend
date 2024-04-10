import React from "react";
import NavBar from "../../components/homepage/NavBar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const PageNotFound = () => {
  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <div style={{ height: "40vh", padding: "5rem", textAlign: "center" }}>
        <div className="">
          <h1>Page Not Found</h1>
          <p>This page doesn't exist!</p>
        </div>

        <Link to="/">
          <button className="btn" style={{ padding: "0.5rem", border: "none" }}>
            Go Back to Home Page
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default PageNotFound;
