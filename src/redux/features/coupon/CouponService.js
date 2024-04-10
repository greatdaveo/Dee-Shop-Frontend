import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/coupon/`;

// For Create Coupon
const createCoupon = async (formData) => {
  const response = await axios.post(API_URL + "create-coupon", formData);

  return response.data;
};

// To Get ALl Coupons
const getAllCoupons = async () => {
  const response = await axios.get(API_URL + "all-coupons");

  return response.data;
};

// To Get Single Coupons
const getSingleCoupon = async (couponName) => {
  const response = await axios.get(API_URL + couponName);

  return response.data;
};

// To Delete a Coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

const couponService = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  deleteCoupon,
};

export default couponService;
