// src/pages/Auth/Register.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../AuthContext";
import { BASE_URL } from "../../utils/constant";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("sugarDaddy"); // Default to 'sugarDaddy', can also be 'sugarBaby'
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
        accountType, // Make sure your backend can handle this property
      });
      console.log(response.data);
      // Save the token and update login state
      if (response.data.token) {
        login(response.data.token);
        // Redirect or perform further actions
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Error occurred during registration"
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
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
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
        >
          <option value="sugarDaddy">Sugar Daddy</option>
          <option value="sugarBaby">Sugar Baby</option>
        </select>
        <button type="submit">Register</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
