import fs from "fs/promises";
import path from "path";
import { fetchPortfolioSync, savePortfolioSync } from "./api";
import { PERSONAL_DETAILS, SKILLS, PROJECTS, TIMELINE, SERVICES, CERTIFICATIONS, TESTIMONIALS, BLOGS } from "@/constants/portfolio-data";

const DB_FILE_PATH = path.join(process.cwd(), "constants/db.json");

export async function getPortfolioData() {
  // 1. Try Express MongoDB Sync API first
  try {
    const data = await fetchPortfolioSync();
    if (data && data.personalDetails) {
      return data;
    }
  } catch (err) {
    console.warn("Express MongoDB API offline, reading from local db.json file...");
  }

  // 2. Fallback to local db.json file
  try {
    const fileContent = await fs.readFile(DB_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (fileErr) {
    console.error("Local db.json read error, returning default template:", fileErr);
    return {
      personalDetails: PERSONAL_DETAILS,
      timeline: TIMELINE,
      skills: SKILLS,
      services: SERVICES,
      projects: PROJECTS,
      certifications: CERTIFICATIONS,
      testimonials: TESTIMONIALS,
      blogs: BLOGS
    };
  }
}

export async function savePortfolioData(data: any) {
  let savedToMongo = false;

  // 1. Try saving to Express MongoDB backend
  try {
    savedToMongo = await savePortfolioSync(data);
  } catch (error) {
    console.warn("MongoDB API write offline or failed, falling back to local file storage:", error);
  }

  // 2. Always write to local db.json file as persistent backup / primary storage
  try {
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (fileErr: any) {
    console.error("Failed to write to local db.json file:", fileErr);
    if (!savedToMongo) {
      throw new Error(`Failed to save database: ${fileErr.message || "Disk write failed."}`);
    }
    return true;
  }
}
