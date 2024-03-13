import axios from "axios";

const Backend_Url = import.meta.env.Backend_Url;
export const API_URL = `${Backend_Url}/api/users/`;

// To Register userSelect
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });

  return response.data;
};

const authService = {
  register,
};

export default authService;
