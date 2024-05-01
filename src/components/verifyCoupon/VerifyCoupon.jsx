import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/verifyCoupon/VerifyCoupon.css";
import {
  REMOVE_COUPON,
  getSingleCouponSlice,
} from "../../redux/features/coupon/CouponSlice";

export const CartDiscount = () => {
  const { coupon } = useSelector((state) => state.coupon);
  const { cartTotalAmount, initialCartTotalAmount } = useSelector(
    (state) => state.cart
  );
  // console.log(cartTotalAmount);

  return (
    <>
      {coupon !== null && (
        <p
          style={{
            marginTop: "2rem",
            marginBottom: "-1rem",
            padding: "0.3rem 1rem",
            border: "1px solid rgb(197, 61, 61)",
            fontSize: "0.9rem",
          }}
        >
          Initial Amount: ${initialCartTotalAmount} | Coupon: {coupon?.name} |
          Discount: {coupon?.discount}%
        </p>
      )}
    </>
  );
};

const VerifyCoupon = () => {
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { coupon } = useSelector((state) => state.coupon);

  // To handle the confirmation of coupon
  const verifyCoupon = (e) => {
    e.preventDefault();

    dispatch(getSingleCouponSlice(couponName));
  };
  // To remove the coupon
  const removeCoupon = () => {
    dispatch(REMOVE_COUPON());
  };

  return (
    <div className="v-coupon-cover">
      <CartDiscount />
      <div className="v-coupon-header">
        <p>Have a coupon</p>

        {coupon === null ? (
          <p onClick={() => setShowForm(true)} className="p-coupon">
            <b>Add Coupon</b>
          </p>
        ) : (
          <p onClick={removeCoupon}>
            <b>Remove Coupon</b>
          </p>
        )}
      </div>

      {showForm && (
        <form onSubmit={verifyCoupon}>
          <input
            type="text"
            placeholder="Coupon name"
            name="name"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value.toUpperCase())}
            required
          />

          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default VerifyCoupon;
