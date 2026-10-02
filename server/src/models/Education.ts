import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  degree: string;
  school: string;
  location: string;
  duration: string;
  description: string;
  bulletPoints: string[];
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    bulletPoints: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
