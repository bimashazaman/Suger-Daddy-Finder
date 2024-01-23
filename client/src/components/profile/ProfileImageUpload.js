import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { updateUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ProfileImageUpload = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cropperRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      setCroppedImage(blob);
    }, "image/jpeg");
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
      return null;
    }

    if (!croppedImage) {
      setErrorMessage("Please select and crop an image.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", croppedImage, "profile.jpg");

    try {
      const response = await axios.put(
        `${BASE_URL}/user/update/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(updateUser(response.data));
      setErrorMessage("");
      setImage(null); // Clear the image state after successful upload

      // Navigate to the profile page
      navigate(`/`);
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Error occurred during the upload"
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto items-center flex flex-col">
      <h1 className="text-2xl font-bold text-purple-200 mb-4 text-center">
        Upload Profile Picture
      </h1>

      <p className="text-gray-400 mb-8 text-center">
        Upload a profile picture to make your profile stand out.
      </p>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-300 p-10 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-400">
          Drag 'n' drop an image here, or click to select an image
        </p>
      </div>
      {image && (
        <div className="mt-6">
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
          />

          <button
            className="w-full p-3 border border-[#7F59F0] rounded-full mt-5 text-white font-semibold hover:bg-[#51379B] transition-all duration-200"
            onClick={handleCrop}
          >
            Crop Image
          </button>
        </div>
      )}
      <button
        className="w-full p-3 bg-[#7F59F0] rounded-full mt-5 text-white font-semibold hover:bg-[#51379B] transition-all duration-200"
        onClick={handleUpload}
      >
        Upload
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* skip this step */}
      <p
        className="text-white mt-8 cursor-pointer hover:text-[#7F59F0] transition-all duration-200 text-sm"
        onClick={() => navigate("/")}
      >
        Skip this step
      </p>
    </div>
  );
};

export default ProfileImageUpload;
