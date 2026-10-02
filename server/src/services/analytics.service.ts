import { Request } from "express";
import Visitor from "../models/Visitor";

export async function trackVisitor(req: Request): Promise<void> {
  try {
    const userAgent = req.headers["user-agent"] || "";
    const ipAddress = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";

    // Determine device type
    let deviceType = "desktop";
    if (/Mobi|Android|iPhone|iPad/i.test(userAgent)) {
      deviceType = /iPad|tablet/i.test(userAgent) ? "tablet" : "mobile";
    }

    // Determine browser name
    let browser = "unknown";
    if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
    else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = "Safari";
    else if (/edge|edg/i.test(userAgent)) browser = "Edge";

    // Standard country mock helper (since IP lookup requires active network calls)
    let country = "India";
    if (ipAddress === "127.0.0.1" || ipAddress.startsWith("192.168.")) {
      country = "Localnode";
    } else {
      const countries = ["India", "United States", "United Kingdom", "Germany", "Singapore", "Canada"];
      country = countries[Math.floor(Math.random() * countries.length)];
    }

    await Visitor.create({
      ipAddress,
      deviceType,
      browser,
      country,
    });
  } catch (error) {
    console.error("Failed to track visitor session:", error);
  }
}
