import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { app } from "../../../firebase/firebase";
import {
  googleAuthSlice,
  registerSlice,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const OAuth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isLoading, isLoggedIn, isSuccess, user } = useSelector(
    (state) => state.auth
  );

  const handleGoogleButton = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      //   console.log(result);
      //      return result;

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const response = await fetch(
        import.meta.env.VITE_Backend_Url + "/api/user/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to authenticate");
      }

      const data = await response.json();
      console.log("OAuth User:", data);

      dispatch(googleAuthSlice(data));
      navigate("/");
      toast.success(data);
    } catch (error) {
      toast.error(error.message || "Authentication failed!");
      console.log("Authentication Error: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleButton} className="g-btn">
        {children}
      </button>
    </div>
  );
};

export default OAuth;
