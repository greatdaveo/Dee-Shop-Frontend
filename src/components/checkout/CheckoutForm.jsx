import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import CheckoutSummary from "./CheckoutSummary";
import "../../styles/components/checkout/CheckoutForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedPaymentMethod,
  selectedShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { useNavigate } from "react-router";
import { createOrderSlice } from "../../redux/features/order/orderSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  // const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const shippingAddress = useSelector(selectedShippingAddress);
  const paymentMethod = useSelector(selectedPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // To save Order
  const saveOrder = () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order placed...",
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon: coupon != null ? coupon : { name: "nil" },
    };

    dispatch(createOrderSlice(formData));
    navigate("/checkout-success");
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${import.meta.env.VITE_Frontend_Url}/checkout-success`,
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful!");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="checkout-form-container">
      <div className="checkout-form-summary">
        <h3>Checkout</h3>
        <CheckoutSummary />
      </div>

      <div className="stripe-checkout-form">
        <h3>Stripe Checkout</h3>

        <form onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && (
            <div id="payment-message" className="error">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
