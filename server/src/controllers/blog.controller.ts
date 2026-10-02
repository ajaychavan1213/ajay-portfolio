import { Request, Response, NextFunction } from "express";
import Blog from "../models/Blog";
import { NotFoundError } from "../utils/customErrors";
import { sendSuccess } from "../utils/response";

export async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const blog = await Blog.create(req.body);
    sendSuccess(res, "Blog created successfully.", { blog }, 201);
  } catch (error) {
    next(error);
  }
}

export async function getBlogs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { category, tag, search } = req.query;
    const filterQuery: any = {};

    if (category) filterQuery.categories = category;
    if (tag) filterQuery.tags = tag;
    if (search) {
      filterQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } }
      ];
    }

    const blogs = await Blog.find(filterQuery).sort("-createdAt");
    sendSuccess(res, "Blogs fetched successfully.", { blogs });
  } catch (error) {
    next(error);
  }
}

export async function getBlogById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return next(new NotFoundError("Blog post not found."));
    sendSuccess(res, "Blog fetched successfully.", { blog });
  } catch (error) {
    next(error);
  }
}

export async function getBlogBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return next(new NotFoundError("Blog post not found."));
    sendSuccess(res, "Blog fetched successfully.", { blog });
  } catch (error) {
    next(error);
  }
}

export async function updateBlog(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return next(new NotFoundError("Blog post not found."));
    sendSuccess(res, "Blog updated successfully.", { blog });
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return next(new NotFoundError("Blog post not found."));
    sendSuccess(res, "Blog deleted successfully.");
  } catch (error) {
    next(error);
  }
}
