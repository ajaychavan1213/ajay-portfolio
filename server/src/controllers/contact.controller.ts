import { Request, Response, NextFunction } from "express";
import Contact from "../models/Contact";
import { trackVisitor } from "../services/analytics.service";
import { sendContactEmail } from "../services/mail.service";
import { NotFoundError } from "../utils/customErrors";
import { sendSuccess } from "../utils/response";

export async function submitContactForm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, message } = req.body;
    const ipAddress = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "";

    // Simple spam detection (messages with generic spam keywords)
    const spamKeywords = ["buy crypto", "seo traffic", "viagra", "make money online fast"];
    const isSpam = spamKeywords.some(
      (keyword) =>
        name.toLowerCase().includes(keyword) ||
        message.toLowerCase().includes(keyword)
    );

    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress,
      isSpam,
    });

    // Run background analytics tracking & email alert alerts asynchronously
    trackVisitor(req).catch(console.error);
    
    if (!isSpam) {
      sendContactEmail(name, email, message).catch(console.error);
    }

    sendSuccess(
      res,
      isSpam ? "Transmission accepted." : "Your message has been transmitted successfully.",
      { contact },
      201
    );
  } catch (error) {
    next(error);
  }
}

export async function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const messages = await Contact.find({}).sort("-createdAt");
    sendSuccess(res, "Messages fetched successfully.", { messages });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return next(new NotFoundError("Message node not found."));
    sendSuccess(res, "Message marked as read.", { contact });
  } catch (error) {
    next(error);
  }
}

export async function deleteMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return next(new NotFoundError("Message node not found."));
    sendSuccess(res, "Message deleted successfully.");
  } catch (error) {
    next(error);
  }
}
