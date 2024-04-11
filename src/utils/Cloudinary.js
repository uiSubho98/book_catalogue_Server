import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
const { CLOUDINARY_SECRET, CLOUDINARY_API_KEY } = process.env;
cloudinary.config({
  cloud_name: "dbohkz4wr",
  api_key: `${CLOUDINARY_API_KEY}`,
  api_secret: `${CLOUDINARY_SECRET}`,
});

console.log(CLOUDINARY_SECRET);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloud
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    console.log({ response }); // remove the locally save temporary file as the upload operation got failed
    return response;
  } catch (error) {
    // console.log({ error });
    fs.unlinkSync(localFilePath); // remove the locally save temporary file as the upload operation got failed
  }
};

export { uploadOnCloudinary };
