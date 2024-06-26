import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/user/`;

// To Register the use with OAuth
const googleAuthService = async (userData) => {
  const response = await axios.post(API_URL + "google", userData, {
    withCredentials: true,
  });

  return response.data;
};

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
  return response.data;
};

// To log out the user
const logoutService = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// To Get log in status of the user
const loginStatusService = async () => {
  const response = await axios.get(API_URL + "login-status");
  return response.data;
};

// To Get the User Data
const getUserService = async () => {
  const response = await axios.get(API_URL + "get-user");
  return response.data;
};

// To Update the User Profile
const updateUserService = async (userData) => {
  const response = await axios.patch(API_URL + "update-profile", userData);
  return response.data;
};

// To Update the User Photo
const updatePhotoService = async (userData) => {
  const response = await axios.patch(API_URL + "update-photo", userData);
  return response.data;
};

const authService = {
  googleAuthService,
  registerService,
  loginService,
  logoutService,
  loginStatusService,
  getUserService,
  updateUserService,
  updatePhotoService,
};

export default authService;
