import React from "react";
import ProfileImageUpload from "../../components/profile/ProfileImageUpload";

const ProfileSettings = () => {
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
        <ProfileImageUpload />
      </div>
    </div>
  );
};

export default ProfileSettings;
