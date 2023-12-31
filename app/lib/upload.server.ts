import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  writeAsyncIterableToWritable,
} from "@remix-run/node";
import type { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
// import invariant from "tiny-invariant";

// invariant(
//   process.env.CLOUDINARY_CLOUD_NAME,
//   "CLOUDINARY_CLOUD_NAME not set in .env"
// );
// invariant(process.env.CLOUDINARY_API_KEY, "CLOUDINARY_API_KEY not set in .env");
// invariant(
//   process.env.CLOUDINARY_API_SECRET,
//   "CLOUDINARY_API_SECRET not set in .env"
// );
// invariant(
//   process.env.CLOUDINARY_IMG_FOLDER,
//   "CLOUDINARY_IMG_FOLDER not set in .env"
// );

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (
  data: AsyncIterable<Uint8Array>
) => {
  const uploadPromise = new Promise<UploadApiResponse | undefined>(
    async (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_IMG_FOLDER,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return uploadPromise;
};

export const uploadHandler = unstable_composeUploadHandlers(
  async ({ name, contentType, data, filename }) => {
    if (name !== "image") {
      return undefined;
    }
    const uploadedImage = await uploadImageToCloudinary(data);
    return uploadedImage?.secure_url;
  },
  // fallback to memory for everything else
  unstable_createMemoryUploadHandler()
);
