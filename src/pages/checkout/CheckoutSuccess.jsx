import React from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";

const CheckoutSuccess = () => {
  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>
      <h1>Checkout Success</h1>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
