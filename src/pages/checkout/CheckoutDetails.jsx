import React, { useEffect } from "react";
import "../../styles/pages/checkout/CheckoutDetails.css";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectedBillingAddress,
  selectedPaymentMethod,
  selectedShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { toast } from "react-toastify";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const paymentMethod = useSelector(selectedPaymentMethod);
  const billAddress = useSelector(selectedBillingAddress);
  const shipAddress = useSelector(selectedShippingAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...shippingAddress, [name]: value });
  };

  useEffect(() => {
    // If there is any (keys) property in the object
    if (Object.keys(shipAddress.length > 0)) {
      // This is to look into redux and get the information stored in the redux state
      setShippingAddress({ ...shipAddress });
    }

    if (Object.keys(shipAddress.length > 0)) {
      // This is to look into redux and get the information stored in the redux state
      setShippingAddress({ ...billAddress });
    }
  }, [billAddress, shipAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    if (paymentMethod === "") {
      return toast.info("Please select a payment method!");
      navigate("/cart");
    }
    if (paymentMethod === "stripe") {
      navigate("/checkout-stripe");
    }
    if (paymentMethod === "flutterwave") {
      navigate("/checkout-flutterwave");
    }
    if (paymentMethod === "paypal") {
      navigate("/checkout-paypal");
    }
    if (paymentMethod === "wallet") {
      navigate("/checkout-wallet");
    }
  };

  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>
      <section className="checkout-cover">
        <form onSubmit={handleSubmit}>
          <h2>Checkout Details</h2>

          <h3>Shipping Address</h3>
          <label>Recipient Name</label>
          <input
            type="text"
            placeholder="Recipient Name"
            required
            name="name"
            value={shippingAddress.name}
            onChange={(e) => handleShipping(e)}
          />

          <label>Address line 1</label>
          <input
            type="text"
            placeholder="Address line 1"
            required
            name="line1"
            value={shippingAddress.line1}
            onChange={(e) => handleShipping(e)}
          />

          <label>Address line 2</label>
          <input
            type="text"
            placeholder="Address line 2"
            required
            name="line2"
            value={shippingAddress.line2}
            onChange={(e) => handleShipping(e)}
          />

          <label>City</label>
          <input
            type="text"
            placeholder="City"
            required
            name="city"
            value={shippingAddress.city}
            onChange={(e) => handleShipping(e)}
          />

          <label>State</label>
          <input
            type="text"
            placeholder="State"
            required
            name="state"
            value={shippingAddress.state}
            onChange={(e) => handleShipping(e)}
          />

          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            required
            name="postal_code"
            value={shippingAddress.postal_code}
            onChange={(e) => handleShipping(e)}
          />

          <label>Country</label>
          <CountryDropdown
            className="country"
            valueType="short"
            value={shippingAddress.country}
            onChange={(val) =>
              handleShipping({
                target: {
                  name: "country",
                  value: val,
                },
              })
            }
          />

          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            required
            name="phone"
            value={shippingAddress.phone}
            onChange={(e) => handleShipping(e)}
          />

          {/* FOR BILLING*/}
          <h3>Billing Address</h3>

          <label>Recipient Name</label>
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={billingAddress.name}
            onChange={(e) => handleBilling(e)}
          />

          <label>Address line 1</label>
          <input
            type="text"
            placeholder="Address line 1"
            required
            name="line1"
            value={billingAddress.line1}
            onChange={(e) => handleBilling(e)}
          />

          <label>Address line 2</label>
          <input
            type="text"
            placeholder="Address line 2"
            required
            name="line2"
            value={billingAddress.line2}
            onChange={(e) => handleBilling(e)}
          />

          <label>City</label>
          <input
            type="text"
            placeholder="City"
            required
            name="city"
            value={billingAddress.city}
            onChange={(e) => handleBilling(e)}
          />

          <label>State</label>
          <input
            type="text"
            placeholder="State"
            required
            name="state"
            value={billingAddress.state}
            onChange={(e) => handleBilling(e)}
          />

          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            required
            name="postal_code"
            value={billingAddress.postal_code}
            onChange={(e) => handleBilling(e)}
          />

          <label>Country</label>
          <CountryDropdown
            className="country"
            valueType="short"
            value={billingAddress.country}
            onChange={(val) =>
              handleBilling({
                target: {
                  name: "country",
                  value: val,
                },
              })
            }
          />

          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            required
            name="phone"
            value={billingAddress.phone}
            onChange={(e) => handleBilling(e)}
          />

          <button type="submit">Proceed To Checkout</button>
        </form>
        <div>
          <CheckoutSummary />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CheckoutDetails;
