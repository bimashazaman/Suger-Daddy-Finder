import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const register = useRegister();

  const handleRegister = (e) => {
    e.preventDefault();
    register(
      username,
      email,
      password,
      () => navigate("/choose-account-type"),
      setErrorMessage
    );
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
        <div className="text-center text-white mb-6 md:w-2/5 w-[80%]">
          <h1 className="text-purple-200 text-4xl font-semibold mb-4">
            Start Your Adventure
          </h1>
          <p className="text-lg mb-4">
            Where connections are more than moments – they're a lifestyle.
          </p>
          <p className="text-sm text-gray-400">
            Sign up now and discover a world where elegance and affection meet.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="w-full max-w-md px-4 md:px-0"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-3 mb-5 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />
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
            className="w-full p-3 mb-7 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />

          <button
            type="submit"
            className="w-full p-3 bg-[#7F59F0] rounded-full mt-2 text-white font-semibold hover:bg-[#51379B] transition-all duration-200"
          >
            Next Step
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>

        <p className="text-white mt-8">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#7F59F0] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
