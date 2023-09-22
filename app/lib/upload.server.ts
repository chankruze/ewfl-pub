import {
    unstable_composeUploadHandlers,
    unstable_createMemoryUploadHandler,
    writeAsyncIterableToWritable,
} from "@remix-run/node";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (data: any) => {
  const uploadPromise = new Promise<
    UploadApiResponse | UploadApiErrorResponse | undefined
  >(async (resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: process.env.CLOUDINARY_IMG_FOLDER },
      (error, result) => {
        if (error) {
          reject(error);
          return null;
        }
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });

  return uploadPromise;
};

export const uploadHandler = unstable_composeUploadHandlers(
  async ({ name, data }) => {
    if (name !== "img") {
      return undefined;
    }
    const uploadedImage = await uploadImage(data);

    return uploadedImage?.secure_url;
  },

  unstable_createMemoryUploadHandler()
);
