import React from "react";
import { useState } from "react";
import "../../../styles/components/admin/category/CreateCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createCouponSlice,
  getAllCouponSlice,
} from "../../../redux/features/coupon/CouponSlice";

const createCoupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(new Date());
  const { isLoading } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  //   To save the coupon
  const saveCoupon = async (e) => {
    e.preventDefault();
    // console.log(name, discount, expiresAt);
    if (name.length < 3) {
      return toast.error("Coupon must be up to 3 characters!");
    }

    if (name.length < 1) {
      return toast.error("Discount must be greater than one!");
    }

    const formData = { name, discount, expiresAt };

    await dispatch(createCouponSlice(formData));
    setName("");
    setDiscount(0);
    setExpiresAt(new Date());
    // To update refresh and update the coupon state
    await dispatch(getAllCouponSlice());
  };

  return (
    <div>
      <div className="create-cat">
        <h2>Create Coupon</h2>
        <p>
          Kindly use this form to <b>Create a Coupon.</b>
        </p>

        <div>
          <form onSubmit={saveCoupon}>
            <label>Coupon Name: </label> <br />
            <input
              type="text"
              placeholder="Coupon Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Coupon Discount: </label> <br />
            <input
              type="number"
              placeholder="Coupon Discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <br />
            <label>Expiry Date: </label> <br />
            <DatePicker
              selected={expiresAt}
              value={expiresAt}
              onChange={(date) => setExpiresAt(date)}
              required
            />
            <br />
            <button type="submit" className="btn">
              Save Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default createCoupon;
