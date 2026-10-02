import { Response } from "express";

export function sendSuccess(
  res: Response,
  message: string,
  data: any = {},
  statusCode: number = 200
): void {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    errors: null,
  });
}

export function sendError(
  res: Response,
  message: string,
  statusCode: number = 400,
  errors: any = null
): void {
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors,
  });
}
