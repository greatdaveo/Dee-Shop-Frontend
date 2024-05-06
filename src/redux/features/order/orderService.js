import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/order/`;

// For Create Coupon
const createOrder = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data.message;
};

// To Get ALl Orders
const getAllOrder = async () => {
  const response = await axios.get(API_URL + "all-orders");

  return response.data;
};

// To Get Single Orders
const getSingleOrder = async (couponName) => {
  const response = await axios.get(API_URL + couponName);

  return response.data;
};

// To Delete a Order
const deleteOrder = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

const orderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  deleteOrder,
};

export default orderService;
