import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { UnauthorizedError, ForbiddenError } from "../utils/customErrors";

export interface AuthRequest extends Request {
  user?: any;
}

// Authenticate JWT access token from Bearer header
export async function protect(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new UnauthorizedError("Access token required. Please login."));
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || "portfolioAccessSecretTokenKey987654321"
    ) as { id: string };

    // Fetch user
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new UnauthorizedError("Associated user account not found."));
    }

    // Bind user context to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// Restrict access by roles
export function restrictTo(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError("Access restricted. Insufficient privileges."));
    }
    next();
  };
}
