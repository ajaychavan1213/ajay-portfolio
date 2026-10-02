import { Request, Response, NextFunction } from "express";
import Project from "../models/Project";
import { NotFoundError } from "../utils/customErrors";
import { sendSuccess } from "../utils/response";

export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await Project.create(req.body);
    sendSuccess(res, "Project created successfully.", { project }, 201);
  } catch (error) {
    next(error);
  }
}

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { category, featured, search, sort } = req.query;
    const filterQuery: any = {};

    if (category) filterQuery.category = category;
    if (featured) filterQuery.featured = featured === "true";
    if (search) {
      filterQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { technologies: { $regex: search, $options: "i" } }
      ];
    }

    let query = Project.find(filterQuery);

    // Sorting
    if (sort) {
      const sortBy = (sort as string).split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const projects = await query;
    sendSuccess(res, "Projects fetched successfully.", { projects });
  } catch (error) {
    next(error);
  }
}

export async function getProjectById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(new NotFoundError("Project not found."));
    sendSuccess(res, "Project fetched successfully.", { project });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return next(new NotFoundError("Project not found."));
    sendSuccess(res, "Project updated successfully.", { project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return next(new NotFoundError("Project not found."));
    sendSuccess(res, "Project deleted successfully.");
  } catch (error) {
    next(error);
  }
}
