import axios from "axios";

const Backend_Url = import.meta.env.VITE_Backend_Url;
export const API_URL = `${Backend_Url}/api/user/`;

// To Create Cart
const saveCartToDB = async (cartData) => {
  const response = await axios.patch(API_URL + "save-cart", cartData);

  return response.data;
};

const cartService = {
  saveCartToDB,
};

export default cartService;
