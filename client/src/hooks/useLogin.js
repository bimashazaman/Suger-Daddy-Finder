// src/hooks/useLogin.js

import axios from "axios";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../features/auth/authSlice";
import { BASE_URL } from "../utils/constant";

const useLogin = () => {
  const dispatch = useDispatch();

  const loginHook = async (email, password, onSuccess, onError) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginAction({
          token: response.data.token,
          user: response.data.user,
        })
      );

      console.log("login success");
      onSuccess();
    } catch (error) {
      onError(error.response?.data || "Error occurred during login");
      console.log(error);
    }
  };

  return loginHook;
};

export default useLogin;
