import React, { useEffect } from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "../../redux/features/cart/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  // To clear cart when the user checkout successfully
  useEffect(() => {
    dispatch(CLEAR_CART());
  }, [dispatch]);

  return (
    <div>
      <Confetti />

      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <div style={{ padding: "4rem", height: "50vw" }}>
        <h1>Checkout Successful! 😁👍</h1>
        <p>Thank you for your purchase!</p>

        <button
          style={{
            padding: "0.5rem 2rem",
            border: "none",
            backgroundColor: "gold",
          }}
        >
          <Link
            to="/order-history"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            View Order Status
          </Link>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
