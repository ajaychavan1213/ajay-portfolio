import { Request, Response, NextFunction } from "express";
import Project from "../models/Project";
import Skill from "../models/Skill";
import Blog from "../models/Blog";
import Contact from "../models/Contact";
import Visitor from "../models/Visitor";
import { sendSuccess } from "../utils/response";

export async function getDashboardStats(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const [
      totalProjects,
      totalSkills,
      totalBlogs,
      totalMessages,
      recentContacts,
      totalVisitors
    ] = await Promise.all([
      Project.countDocuments({}),
      Skill.countDocuments({}),
      Blog.countDocuments({}),
      Contact.countDocuments({}),
      Contact.find({}).sort("-createdAt").limit(5),
      Visitor.countDocuments({})
    ]);

    // Visitor analytics breakdown
    const [deviceBreakdown, browserBreakdown, countryBreakdown] = await Promise.all([
      Visitor.aggregate([
        { $group: { _id: "$deviceType", count: { $sum: 1 } } }
      ]),
      Visitor.aggregate([
        { $group: { _id: "$browser", count: { $sum: 1 } } }
      ]),
      Visitor.aggregate([
        { $group: { _id: "$country", count: { $sum: 1 } } }
      ])
    ]);

    sendSuccess(res, "Dashboard analytics compiled successfully.", {
      stats: {
        totalProjects,
        totalSkills,
        totalBlogs,
        totalMessages,
        totalVisitors,
      },
      recentContacts,
      analytics: {
        deviceBreakdown: deviceBreakdown.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
        browserBreakdown: browserBreakdown.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
        countryBreakdown: countryBreakdown.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
      }
    });
  } catch (error) {
    next(error);
  }
}
