// utils/uploadFile.js

import s3 from "../config/aws-config.js";

const uploadFile = async (file) => {
  const params = {
    Bucket: "sugardaddyfinder",
    Key: "profilePictures/" + file.originalname,
    Body: file.buffer, // Use the buffer from the received file
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  try {
    const s3Response = await s3.upload(params).promise();
    console.log(s3Response);
    return s3Response; // This will return the URL to access the file
  } catch (err) {
    console.log(err);
    throw new Error("Error in file upload");
  }
};

export { uploadFile };
