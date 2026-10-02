import { Request, Response, NextFunction } from "express";
import { askAIAssistant } from "../services/ai.service";
import { BadRequestError } from "../utils/customErrors";
import { sendSuccess } from "../utils/response";

export async function handleAIChat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { question, history } = req.body;
    if (!question) {
      return next(new BadRequestError("Question query is required."));
    }

    const answer = await askAIAssistant(question, history || []);
    sendSuccess(res, "AI Assistant response resolved.", { answer });
  } catch (error) {
    next(error);
  }
}
