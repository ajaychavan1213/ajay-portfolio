import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  bulletPoints: string[];
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    bulletPoints: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
