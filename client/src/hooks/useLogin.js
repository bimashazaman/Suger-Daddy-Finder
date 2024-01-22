// src/hooks/useLogin.js

import axios from "axios";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../features/auth/authSlice";
import { BASE_URL } from "../utils/constant";

const useLogin = () => {
  const dispatch = useDispatch();

  const login = async (email, password, onSuccess, onError) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      dispatch(loginAction(response.data.token));
      onSuccess();
    } catch (error) {
      onError(error.response?.data || "Error occurred");
    }
  };

  return login;
};

export default useLogin;
