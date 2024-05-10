import React, { useEffect } from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import "../../styles/components/checkout/CheckoutForm.css";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authenticatedUser } from "../../redux/features/auth/authSlice";
import {
  selectedPaymentMethod,
  selectedShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutWithFlutterwave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // To get the total amount to pay
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const user = useSelector(authenticatedUser);
  const shippingAddress = useSelector(selectedShippingAddress);
  const paymentMethod = useSelector(selectedPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);
  // To get the params in the url
  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");
  const ref = urlParams.get("ref");

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
  };

  useEffect(() => {
    if (
      payment === "successful" &&
      ref === import.meta.env.VITE_TX_REF &&
      cartTotalAmount > 0
    ) {
      toast.success("Payment successful!");
      saveOrder();
      navigate("/checkout-success");
    }

    if (payment === "failed") {
      toast.error("Payment failed!");
    }
  }, [payment, ref, cartTotalAmount, navigate]);

  // For Flutterwave Inline Integration
  const makePayment = () => {
    FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
      tx_ref: import.meta.env.VITE_TX_REF,
      amount: cartTotalAmount,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      redirect_url: `${
        import.meta.env.VITE_Frontend_Url
      }/api/order/flutterwave-payment-response`,

      //   meta: {
      //     consumer_id: 23,
      //     consumer_mac: "92a3-912ba-1192a",
      //   },
      customer: {
        email: user.email,
        phone_number: user.phone,
        name: user.name,
      },
      customizations: {
        title: "DeeShop Online Store",
        description: "Payment for products",
        logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
      },
    });
  };

  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <div className="checkout-form-container">
        <div className="checkout-form-summary">
          <h3>Checkout</h3>
          <CheckoutSummary />
        </div>

        <div className="stripe-checkout-form" style={{ marginTop: "5rem" }}>
          <h3>Flutterwave Checkout</h3>

          <button onClick={makePayment} style={{ margin: "0 auto" }}>
            Pay now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutWithFlutterwave;
