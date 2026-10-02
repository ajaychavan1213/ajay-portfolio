import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: "web3d" | "ai" | "mobile" | "devops" | "other";
  description: string;
  details: string;
  technologies: string[];
  github: string;
  demo: string;
  images: string[];
  featured: boolean;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    category: { 
      type: String, 
      enum: ["web3d", "ai", "mobile", "devops", "other"], 
      required: true 
    },
    description: { type: String, required: true },
    details: { type: String, required: true },
    technologies: [{ type: String }],
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
