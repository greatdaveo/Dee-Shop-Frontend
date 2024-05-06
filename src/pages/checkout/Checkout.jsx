import React, { useState, useEffect } from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { useSelector } from "react-redux";
import { extractIdAndCartQuantity } from "../../utils";
import { selectedShippingAddress } from "../../redux/features/checkout/checkoutSlice";
import { authenticatedUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState(""); 
  

  const user = useSelector(authenticatedUser);
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const shipAddress = useSelector(selectedShippingAddress);
  const description = `DeeShop Payment: by email: ${user?.email}, Amount: ${cartTotalAmount}`;

  // For the extraction of the cart items (id and quantity)
  const productIDs = extractIdAndCartQuantity(cartItems);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      `${import.meta.env.VITE_Backend_Url}/api/order/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productIDs,
          shipping: shipAddress,
          description,
          coupon,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout!");
        toast.error(error.message);
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <section>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <div>{!clientSecret && <h3>{message}</h3>}</div>

      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default Checkout;
