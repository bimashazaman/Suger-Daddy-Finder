import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import * as Yup from "yup";
import { useFormik } from "formik";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const register = useRegister();

  // Yup schema for form validation
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      register(
        values.username,
        values.email,
        values.password,
        () => navigate("/choose-account-type"),
        setErrorMessage
      );
    },
  });

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
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md px-4 md:px-0"
        >
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder="Username"
            className="w-full p-3 mb-5 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-red-500 -mt-3 mb-4">{formik.errors.username}</p>
          ) : null}
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
            <p className="text-red-500 -mt-3 mb-4">{formik.errors.email}</p>
          ) : null}

          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
            className="w-full p-3 mb-7 bg-transparent border border-white text-white rounded-full hover:border-[#7F59F0] transition-all duration-200 outline-none focus:border-[#7F59F0] focus:ring-2 focus:ring-[#7F59F0] focus:ring-opacity-50"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 -mt-4 mb-4">{formik.errors.password}</p>
          ) : null}

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
