import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "../../hooks/useLogin";
import { useSelector } from "react-redux";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const loginHook = useLogin();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Yup schema for form validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // check if the user is logged in
  if (isLoggedIn) {
    //if the user account type is sugar daddy, navigate to /daddies else navigate to /babies
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.accountType === "sugar-daddy") {
        navigate("/daddies");
      } else {
        navigate("/babies");
      }
    }
  }

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginHook(values.email, values.password, navigate, setErrorMessage);
    },
  });

  return (
    <div className="h-screen flex bg-[#16161b] overflow-hidden">
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={`/assets/images/registerImage.png`}
          alt="Register"
          className="w-full h-full object-cover box"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center z-10">
        <h1 className=" text-purple-200 text-4xl font-semibold mb-4">Login</h1>

        <div className="text-center mb-8 md:w-2/5 w-[80%]">
          <p className="text-gray-400 text-sm">
            Welcome to a world where connections are more than just a swipe
            away.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md px-4 md:px-0"
        >
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
            className="w-full p-3 mb-5 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 -mt-3 mb-5">{formik.errors.email}</p>
          ) : null}

          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
            className="w-full p-3 mb-2 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
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
