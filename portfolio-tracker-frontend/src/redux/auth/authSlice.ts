import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import {
  SigninValuesType,
  SignupValuesType,
} from "../../schema/authValidation";
import { setSpinner } from "../loader/loaderSlice";
import { errorToast, successToast } from "../../utils/toast";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:
      localStorage.getItem("userAuthToken") !== "null"
        ? localStorage.getItem("userAuthToken")
        : null,
    userName: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
    },
  },
});
const { setToken, setUsername } = authSlice.actions;

export const userSignUp = (
  signUpData: SignupValuesType,
  navigation: () => void
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSpinner(1));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL + "api/v1/user/signup"}`,
        signUpData
      );
      if (response.data.payload.token) {
        localStorage.setItem("userAuthToken", response.data.payload.token);
        dispatch(setToken(response.data.payload.token));
        dispatch(setUsername(response.data.payload.username || ""));
        successToast(response.data.message);
        navigation();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
      }
    }
    dispatch(setSpinner(-1));
  };
};

export const userSignIn = (
  SigninData: SigninValuesType,
  navigation: () => void
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSpinner(1));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL + "api/v1/user/signin"}`,
        SigninData
      );
      if (response.data.payload.token) {
        localStorage.setItem("userAuthToken", response.data.payload.token);
        dispatch(setToken(response.data.payload.token));
        dispatch(setUsername(response.data.payload.username || ""));
        successToast(response.data.message);
        navigation();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
      }
    }
    dispatch(setSpinner(-1));
  };
};

export const getUserData = (navigation: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSpinner(1));
    try {
      const token = localStorage.getItem("userAuthToken");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL + "api/v1/user/detail"}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.payload.username) {
        dispatch(setUsername(response.data.payload.username));
      } else {
        localStorage.removeItem("userAuthToken");
        navigation("/signin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          localStorage.removeItem("userAuthToken");
          navigation("/signin");
        }
      }
    }
    dispatch(setSpinner(-1));
  };
};

export const userLogOut = (navigation: () => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem("userAuthToken");
      dispatch(setToken(null));
      dispatch(setUsername(""));
      successToast("User logout successful");
      navigation();
    } catch (error) {
      console.log(error);
    }
  };
};

export default authSlice.reducer;
