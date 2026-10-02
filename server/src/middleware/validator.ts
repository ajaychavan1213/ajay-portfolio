import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "../utils/customErrors";

// Validate request body using Zod schema
export function validateBody(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      // Map Zod errors
      const formattedErrors = error.errors?.map((err: any) => ({
        path: err.path.join("."),
        message: err.message,
      })) || error.message;

      next(new BadRequestError("Validation failed.", formattedErrors));
    }
  };
}
