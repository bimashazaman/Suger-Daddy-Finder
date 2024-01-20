// src/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
      // Save the token and update login state
      if (response.data.token) {
        login(response.data.token);
        // Redirect or perform further actions
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response?.data || "Error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
