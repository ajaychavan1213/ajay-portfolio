import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { BadRequestError, UnauthorizedError } from "../utils/customErrors";
import { sendSuccess } from "../utils/response";

function generateAccessToken(userId: string): string {
  return jwt.sign(
    { id: userId },
    (process.env.JWT_ACCESS_SECRET || "portfolioAccessSecretTokenKey987654321") as jwt.Secret,
    { expiresIn: (process.env.JWT_ACCESS_EXPIRE || "15m") as any }
  );
}

function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { id: userId },
    (process.env.JWT_REFRESH_SECRET || "portfolioRefreshSecretTokenKey123456789") as jwt.Secret,
    { expiresIn: (process.env.JWT_REFRESH_EXPIRE || "7d") as any }
  );
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new BadRequestError("Email address already registered."));
    }

    // Force first registered user as Admin
    const userCount = await User.countDocuments({});
    const role = userCount === 0 ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Hide password
    user.password = undefined;

    sendSuccess(res, "User registered successfully.", { user }, 201);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find user and select password explicitly
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return next(new UnauthorizedError("Invalid email or password credentials."));
    }

    const accessToken = generateAccessToken(user._id as string);
    const refreshToken = generateRefreshToken(user._id as string);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    user.password = undefined;
    user.refreshToken = undefined;

    sendSuccess(res, "Login successful.", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { token } = req.body;
    if (!token) {
      return next(new BadRequestError("Refresh token is required."));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || "portfolioRefreshSecretTokenKey123456789"
    ) as { id: string };

    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== token) {
      return next(new UnauthorizedError("Invalid or expired refresh token."));
    }

    const accessToken = generateAccessToken(user._id as string);
    const newRefreshToken = generateRefreshToken(user._id as string);

    user.refreshToken = newRefreshToken;
    await user.save();

    sendSuccess(res, "Access token refreshed.", {
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: any) {
    next(new UnauthorizedError("Session expired. Please login again."));
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { token } = req.body;
    if (!token) {
      return next(new BadRequestError("Refresh token is required for logout."));
    }

    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }

    sendSuccess(res, "Logout successful.");
  } catch (error) {
    next(error);
  }
}
