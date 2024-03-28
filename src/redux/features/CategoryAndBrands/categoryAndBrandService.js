import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/`; 

// For Create Category
const createCategory = async (formData) => {
  const response = await axios.post(
    API_URL + "category/create-category",
    formData
  );

  return response.data;
};

// To Get ALl Category
const getAllCategories = async () => {
  const response = await axios.get(API_URL + "category/all-categories");

  return response.data;
};

//  To Delete Category
const deleteCategory = async (slug) => {
  const response = await axios.delete(
    API_URL + "category/delete-category/" + slug
  );

  return response.data.message;
};

const categoryAndBrandService = {
  createCategory,
  getAllCategories,
  deleteCategory,
};

export default categoryAndBrandService;
