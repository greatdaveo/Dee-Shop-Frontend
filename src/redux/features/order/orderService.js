import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/order/`;

// For Create Coupon
const createOrder = async (formData) => {
  const response = await axios.post(API_URL + "/create-order", formData);

  return response.data.message;
};

// To Get ALl Orders
const getAllOrders = async () => {
  const response = await axios.get(API_URL + "all-orders");

  return response.data;
};

// To Get Single Order
const getSingleOrder = async (id) => {
  const response = await axios.get(API_URL + id);

  return response.data;
};

// For Admin to Update Order Status
const updateOrderStatus = async (id, formData) => {
  const response = await axios.patch(
    API_URL + "/update-status/" + id,
    formData
  );
  return response.data.message;
}



const orderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
};

export default orderService;
