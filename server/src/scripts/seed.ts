import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment config
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { connectDB } from "../config/db";
import Setting from "../models/Setting";
import Skill from "../models/Skill";
import Experience from "../models/Experience";
import Education from "../models/Education";
import Service from "../models/Service";
import Project from "../models/Project";
import Certificate from "../models/Certificate";
import Testimonial from "../models/Testimonial";
import User from "../models/User";
import Blog from "../models/Blog";

async function seedDatabase() {
  try {
    // 1. Connect DB
    await connectDB();

    // Ensure default Admin User exists
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      console.log("Creating default Admin user...");
      await User.create({
        name: "Ajay Chavan Admin",
        email: "admin@ajay.dev",
        password: "admin123",
        role: "admin",
      });
      console.log("✔ Created Admin User (Email: admin@ajay.dev | Password: admin123)");
    }

    // 2. Read db.json
    const dbPath = path.join(__dirname, "../../../clinte/constants/db.json");
    console.log(`Reading initial database from: ${dbPath}`);
    const rawData = await fs.readFile(dbPath, "utf-8");
    const data = JSON.parse(rawData);

    const { personalDetails, timeline, skills, services, projects, certifications, testimonials, blogs } = data;

    // 3. Drop existing entries
    console.log("Cleaning MongoDB collections...");
    await Promise.all([
      Setting.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Testimonial.deleteMany({}),
      Blog.deleteMany({})
    ]);

    const insertPromises: any[] = [];

    // 4. Queue updates
    if (personalDetails) {
      console.log("Queueing Personal Details Setting...");
      insertPromises.push(Setting.create(personalDetails));
    }
    if (skills && skills.length > 0) {
      console.log(`Queueing ${skills.length} Skills...`);
      insertPromises.push(Skill.insertMany(skills));
    }
    if (services && services.length > 0) {
      console.log(`Queueing ${services.length} Services...`);
      insertPromises.push(Service.insertMany(services));
    }
    if (projects && projects.length > 0) {
      console.log(`Queueing ${projects.length} Projects...`);
      insertPromises.push(Project.insertMany(projects));
    }
    if (certifications && certifications.length > 0) {
      console.log(`Queueing ${certifications.length} Certifications...`);
      insertPromises.push(Certificate.insertMany(certifications));
    }
    if (testimonials && testimonials.length > 0) {
      console.log(`Queueing ${testimonials.length} Testimonials...`);
      insertPromises.push(Testimonial.insertMany(testimonials));
    }
    if (blogs && blogs.length > 0) {
      console.log(`Queueing ${blogs.length} Blogs...`);
      insertPromises.push(Blog.insertMany(blogs));
    }

    if (timeline && timeline.length > 0) {
      const experiencesToInsert = timeline
        .filter((item: any) => item.type === "experience")
        .map((item: any) => ({
          role: item.roleOrDegree,
          company: item.companyOrInstitution,
          location: item.location,
          duration: item.duration,
          description: item.description,
          bulletPoints: item.bulletPoints || []
        }));

      const educationsToInsert = timeline
        .filter((item: any) => item.type === "education")
        .map((item: any) => ({
          degree: item.roleOrDegree,
          school: item.companyOrInstitution,
          location: item.location,
          duration: item.duration,
          description: item.description,
          bulletPoints: item.bulletPoints || []
        }));

      if (experiencesToInsert.length > 0) {
        console.log(`Queueing ${experiencesToInsert.length} Experience items...`);
        insertPromises.push(Experience.insertMany(experiencesToInsert));
      }
      if (educationsToInsert.length > 0) {
        console.log(`Queueing ${educationsToInsert.length} Education items...`);
        insertPromises.push(Education.insertMany(educationsToInsert));
      }
    }

    // 5. Run insertions
    console.log("Seeding MongoDB database...");
    await Promise.all(insertPromises);
    console.log("✔ Database seeding successfully completed!");
    
    // Disconnect Mongoose connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("❌ Failed to seed database:", error);
    process.exit(1);
  }
}

seedDatabase();
