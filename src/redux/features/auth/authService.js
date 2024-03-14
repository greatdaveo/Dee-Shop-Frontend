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

// To log out the user
const logoutService = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
}



const authService = {
  registerService,
  loginService,
  logoutService,
};

export default authService;
