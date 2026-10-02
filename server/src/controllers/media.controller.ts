import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import { BadRequestError } from "../utils/customErrors";
import { sendSuccess } from "../utils/response";

export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      return next(new BadRequestError("No media file provided for upload."));
    }

    // Convert buffer to stream and upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio_media",
      },
      (error, result) => {
        if (error || !result) {
          return next(new BadRequestError(`Cloudinary Upload Error: ${error?.message || "Unknown error"}`));
        }
        
        sendSuccess(res, "Media uploaded successfully.", {
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
}
