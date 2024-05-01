import React, { useState } from "react";
import "../../styles/components/paymentOptions/PaymentOptions.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SAVE_PAYMENT_METHOD } from "../../redux/features/checkout/checkoutSlice";

const PaymentOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);

  const setPayment = (e) => {
    e.preventDefault();
    // console.log(paymentMethod);
    if (paymentMethod === "") {
      return toast.error("Please select a payment method!");
    }
    // To save the payment method to redux
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));

    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      navigate("/login?redirect=cart");
    }
  };

  return (
    <div className="payment-options">
      <p>Please choose a payment method</p> <br />
      <form onSubmit={setPayment}>
        <label htmlFor="stripe">
          <input
            type="radio"
            name="paymentMethod"
            id="stripe"
            value={"stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="radio-span">Stripe</span>
        </label>
        <br />
        <label htmlFor="flutterwave">
          <input
            type="radio"
            name="paymentMethod"
            id="flutterwave"
            value={"flutterwave"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="radio-span">Flutterwave</span>
        </label>
        <br />
        <label htmlFor="paypal">
          <input
            type="radio"
            name="paymentMethod"
            id="paypal"
            value={"paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="radio-span">Paypal</span>
        </label>
        <br />
        <label htmlFor="wallet">
          <input
            type="radio"
            name="paymentMethod"
            id="wallet"
            value={"wallet"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="radio-span">Wallet</span>
        </label>
        <br />
        <button type="submit">CHECK OUT</button>
      </form>
    </div>
  );
};

export default PaymentOptions;
