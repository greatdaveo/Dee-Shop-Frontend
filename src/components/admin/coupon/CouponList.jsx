import React, { useEffect } from "react";
import "../../../styles/components/admin/brand/BrandList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCouponSlice,
  getAllCouponSlice,
  getSingleCouponSlice,
} from "../../../redux/features/coupon/CouponSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaTrashAlt } from "react-icons/fa";

const CouponList = () => {
  const { coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  // To control the state of the coupon
  useEffect(() => {
    // To get all the coupons
    dispatch(getAllCouponSlice());
    // To get a single coupon
    dispatch(getSingleCouponSlice("PRESALE"));
  }, [dispatch]);

  const confirmToDelete = (id) => {
    confirmAlert({
      title: "Delete Coupon",
      message: "Are you sure you want to delete this coupon?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCoupon(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const delCoupon = async (id) => {
    await dispatch(deleteCouponSlice(id));

    // To refresh the page and update the coupon state after deleting
    await dispatch(getAllCouponSlice());
  };

  return (
    <div className="brand-cover">
      <h1>Coupons List 📃</h1>

      <div className="brand-table">
        {coupons.length === 0 ? (
          <p>No Coupon Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Discount %</th>
                <th>Date Created</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(coupons) ? (
                coupons.map((coupon, i) => (
                  <tr key={coupon._id}>
                    <td>{i + 1}</td>
                    <td>{coupon.name}</td>
                    <td>{coupon.discount}</td>
                    <td>{coupon.createdAt.substring(0, 10)}</td>
                    <td>{coupon.expiresAt.substring(0, 10)}</td>
                    <td>
                      <button>
                        <FaTrashAlt
                          size={15}
                          color="red"
                          onClick={() => confirmToDelete(coupon._id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No Categories found!</p>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CouponList;
