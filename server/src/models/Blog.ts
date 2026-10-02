import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  readTime: string;
  summary: string;
  slug: string;
  content: string;
  categories: string[];
  tags: string[];
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    readTime: { type: String, default: "5 min read" },
    summary: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, default: "" },
    categories: [{ type: String }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
