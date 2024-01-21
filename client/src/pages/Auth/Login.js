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
    <div className="h-screen flex bg-[#16161b] overflow-hidden">
      {/* Image Section */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={`/assets/images/registerImage.png`}
          alt="Register"
          className="w-full h-full object-cover box"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center z-10">
        <h1 className=" text-purple-200 text-4xl font-semibold mb-4">Login</h1>

        {/* write something sweet here for the suger daddy dating app */}
        <div className="text-center mb-8 md:w-2/5 w-[80%]">
          <p className="text-gray-400 text-sm">
            Welcome to a world where connections are more than just a swipe
            away.
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-md px-4 md:px-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 mb-5 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 mb-2 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />
          <div className=" text-right text-white mb-5 cursor-pointer hover:text-[#7F59F0] transition-all duration-200 pr-3">
            <p className="text-white  text-sm">
              <span className="text-[#7F59F0] cursor-pointer">
                Forgot Password?
              </span>
            </p>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#7F59F0] rounded-full mt-2 text-white font-semibold hover:bg-[#51379B] transition-all duration-200"
          >
            Login
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>

        <p className="text-white mt-8">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#7F59F0] cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
