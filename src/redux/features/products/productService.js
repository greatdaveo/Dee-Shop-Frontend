import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/products/`;

// To Create Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};

// To Get All Products
const getAllProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// To Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data;
};

// To Edit a Product
const editProduct = async (id) => {
  const response = await axios.get(API_URL + id);

  return response.data;
};

// To Update a Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(API_URL + id, formData);

  return response.data;
};

const productService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
  updateProduct,
};

export default productService;
