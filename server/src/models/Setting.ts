import mongoose, { Schema, Document } from "mongoose";

export interface ISetting extends Document {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  resumeUrl: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  stats: { label: string; value: string }[];
  achievements: { title: string; desc: string }[];
}

const SettingSchema = new Schema<ISetting>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    bio: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    achievements: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);
