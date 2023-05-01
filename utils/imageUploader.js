import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const imageUploader = async (image) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: 'carpeta-de-almacenamiento',
    });
    return uploadedImage.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};