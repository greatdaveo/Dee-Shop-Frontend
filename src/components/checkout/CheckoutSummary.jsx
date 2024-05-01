import React, { useEffect } from "react";
import "../../styles/components/checkout/CheckoutSummary.css";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { CartDiscount } from "../verifyCoupon/VerifyCoupon";

const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
  }, [dispatch, cartItems, coupon]);

  return (
    <div className="checkout-summary">
      <h3>Check out Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <div>
            <p>No item in your cart!</p>
            <button>
              <Link to="/#products">Back To Shop</Link>
            </button>
          </div>
        ) : (
          <div className="summary-cover">
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>

            <div className="sub-total">
              <h5>Subtotal:</h5>
              <span>${cartTotalAmount.toFixed(2)}</span>
            </div>

            <div className="summary-details-cover">
              <div style={{ marginTop: "-2.5rem" }}>
                <CartDiscount />
              </div>

              {cartItems.map((item, i) => {
                const { _id, name, discountedPrice, cartQuantity } = item;
                return (
                  <div key={i} className="summary-details">
                    <h4>Product: {name}</h4>
                    <p>Quantity: {cartQuantity}</p>
                    <p>Unit price: {discountedPrice}</p>
                    <p>Set price: {discountedPrice * cartQuantity}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
