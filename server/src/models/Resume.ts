import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  title: string;
  fileUrl: string;
  fileKey: string;
  isActive: boolean;
}

const ResumeSchema = new Schema<IResume>(
  {
    title: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
    fileKey: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
