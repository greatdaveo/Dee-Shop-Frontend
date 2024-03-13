import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/user/`;

// To Register userSelect
const registerService = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });

  return response.data;
};

const authService = {
  registerService,
};

export default authService;
