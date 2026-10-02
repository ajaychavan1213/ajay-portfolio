import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: "frontend" | "backend" | "database" | "mobile" | "devops" | "ai";
  level: number;
  iconName: string;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    category: { 
      type: String, 
      enum: ["frontend", "backend", "database", "mobile", "devops", "ai"], 
      required: true 
    },
    level: { type: Number, required: true, min: 0, max: 100 },
    iconName: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
