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

const categoryAndBrandService = {
  createCategory,
};

export default categoryAndBrandService;
