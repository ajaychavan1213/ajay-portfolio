import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/customErrors";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error.";
  let errors = err.errors || null;

  // Mongoose validation errors format
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Database validation failed.";
    errors = Object.values(err.errors).map((el: any) => el.message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)?.[0] || "";
    message = `Duplicate field value: ${value}. Please use another value.`;
  }

  // Mongoose CastError (e.g. invalid object ID)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid cast for path '${err.path}' value: '${err.value}'.`;
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your session token has expired. Please login again.";
  }

  // JWT web token error
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid auth token signature. Access denied.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors,
  });
}
