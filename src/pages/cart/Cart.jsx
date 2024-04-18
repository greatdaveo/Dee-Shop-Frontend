import Footer from "../../components/Footer";
import NavBar from "../../components/homepage/NavBar";
import "../../styles/cart/Cart.css";

import React from "react";

const Cart = () => {
  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>
      
      <h1>Cart</h1>

      <Footer />
    </div>
  );
};

export default Cart;
