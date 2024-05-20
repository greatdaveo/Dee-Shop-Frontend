import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const googleAuthSlice = createAsyncThunk(
  "auth/google",
  async (userData, thunkAPI) => {
    try {
      return await authService.registerService(userData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To register the user
export const registerSlice = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.registerService(userData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Login the user
export const loginSlice = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.loginService(userData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Logout the user
export const logoutSlice = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await authService.logoutService();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// For Login Status of the user
export const loginStatusSlice = createAsyncThunk(
  "auth/login-status",
  async (_, thunkAPI) => {
    try {
      return await authService.loginStatusService();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Get User Info
export const getUserSlice = createAsyncThunk(
  "auth/get-user",
  async (_, thunkAPI) => {
    try {
      return await authService.getUserService();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Update the User  Profile
export const updateUserSlice = createAsyncThunk(
  "auth/update-profile",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUserService(userData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// To Update User Photo
export const updatePhotoSlice = createAsyncThunk(
  "auth/update-photo",
  async (userData, thunkAPI) => {
    try {
      return await authService.updatePhotoService(userData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // For the User Google Authentication
      .addCase(googleAuthSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(googleAuthSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Your registration is now successful!");
      })

      .addCase(googleAuthSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // For the User Registration
      .addCase(registerSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(registerSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Your registration is now successful!");
      })

      .addCase(registerSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // For the User Login
      .addCase(loginSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("You just logged in!");
        // console.log(action.payload);
      })

      .addCase(loginSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // For the User Logout
      .addCase(logoutSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(logoutSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);
        // console.log(action.payload);
      })

      .addCase(logoutSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // For the User Login Status
      .addCase(loginStatusSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginStatusSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        // console.log("Fulfilled User Login Status:", action.payload);
        // When the token sent to the backend is not valid
        if (action.payload.message === "invalid signature") {
          state.isLoggedIn = false;
        }
      })

      .addCase(loginStatusSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // console.log("Rejected User Login Status:", action.payload);
      })

      // For the Get User
      .addCase(getUserSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getUserSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        // console.log("Fulfilled getUser:", action.payload);
      })

      .addCase(getUserSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Rejected getUser:", action.payload);
      })

      // For Update the User Profile
      .addCase(updateUserSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateUserSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("You have updated your profile!");
        // console.log("Fulfilled updateUser:", action.payload);
      })

      .addCase(updateUserSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Rejected updateUser:", action.payload);
      })

      // For Update the User Photo
      .addCase(updatePhotoSlice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updatePhotoSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("You have updated your profile!");
        // console.log("Fulfilled updatePhoto:", action.payload);
      })

      .addCase(updatePhotoSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        // console.log("Rejected updatePhoto:", action.payload);
      });
  },
});

export const { RESET_AUTH } = authSlice.actions;

export const authenticatedUser = (state) => state.auth.user;

export default authSlice.reducer;
