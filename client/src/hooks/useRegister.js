// src/hooks/useRegister.js

import axios from "axios";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../features/auth/authSlice";
import { BASE_URL } from "../utils/constant";

const useRegister = () => {
  const dispatch = useDispatch();

  const register = async (username, email, password, onSuccess, onError) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
      });
      dispatch(loginAction(response.data.token));
      onSuccess();
    } catch (error) {
      onError(error.response?.data || "Error occurred during registration");
    }
  };

  return register;
};

export default useRegister;
