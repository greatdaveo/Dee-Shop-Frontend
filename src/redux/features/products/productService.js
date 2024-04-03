import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/products/`;

// To Create Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};

const productService = { createProduct };

export default productService;
