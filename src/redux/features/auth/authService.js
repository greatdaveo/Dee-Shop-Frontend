import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/user/`;

// To Register the user 
const registerService = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });

  return response.data;
};

// To login the user
const loginService = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data
}

const authService = {
  registerService,
  loginService
};

export default authService;
