import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChooseAccountType = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const userId = user?._id;

  const handleAccountTypeSelection = (accountType) => {
    if (!isLoggedIn) {
      // If user is not logged in, redirect to login page
      navigate("/login");
      return;
    }

    // Prepare updates
    const updates = {
      accountType: accountType,
    };

    // Dispatch the updateUser action
    dispatch(updateUser({ userId: userId, updates: updates }));

    // Redirect to home page
    navigate("/profile-settings");
  };
  return (
    <div className="h-screen flex bg-[#16161b] overflow-hidden">
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={`/assets/images/registerImage.png`}
          alt="Choose Account Type"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center z-10 px-4 md:px-10">
        <div className="backdrop-blur-md bg-opacity-30  p-6 text-center">
          <h1 className="text-purple-200 text-4xl font-semibold mb-8">
            Choose Your Path
          </h1>

          <p className="text-gray-300 text-lg mb-10">
            Your journey to meaningful connections starts here. Select your
            account type and embrace a world tailored to your lifestyle.
          </p>

          <div className="w-full flex flex-col md:flex-row justify-between gap-6 mb-10">
            <button
              className="bg-transparent border-2 border-[#7F59F0] w-full py-4 rounded-full text-white text-lg font-semibold hover:bg-[#7F59F0] transition-all duration-300 shadow-md"
              onClick={() => handleAccountTypeSelection("sugardaddy")}
            >
              Sugar Daddy
            </button>
            <button
              className="bg-[#7F59F0] w-full py-4 rounded-full text-white text-lg font-semibold hover:bg-[#51379B] transition-all duration-300 border-2 border-[#7F59F0] shadow-md"
              onClick={() => handleAccountTypeSelection("sugarbaby")}
            >
              Sugar Baby
            </button>
          </div>

          <p className="text-gray-300 text-lg">
            Already have an account?{" "}
            <a href="/login" className="text-[#7F59F0] hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseAccountType;
