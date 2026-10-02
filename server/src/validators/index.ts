import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required."),
  category: z.enum(["web3d", "ai", "mobile", "devops", "other"]),
  description: z.string().min(5, "Description is required."),
  details: z.string().min(5, "Details are required."),
  technologies: z.array(z.string()).default([]),
  github: z.string().or(z.literal("")).default(""),
  demo: z.string().or(z.literal("")).default(""),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required."),
  category: z.enum(["frontend", "backend", "database", "mobile", "devops", "ai"]),
  level: z.number().min(0).max(100, "Skill level must be between 0 and 100."),
  iconName: z.string().default(""),
});

export const blogSchema = z.object({
  title: z.string().min(2, "Title is required."),
  readTime: z.string().default("5 min read"),
  summary: z.string().min(5, "Summary is required."),
  slug: z.string().min(2, "Slug is required."),
  content: z.string().min(10, "Content must be longer."),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});
