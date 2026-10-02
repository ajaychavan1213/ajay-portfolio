import { Request, Response, NextFunction } from "express";
import Skill from "../models/Skill";
import Experience from "../models/Experience";
import Education from "../models/Education";
import Certificate from "../models/Certificate";
import Service from "../models/Service";
import Testimonial from "../models/Testimonial";
import Setting from "../models/Setting";
import Project from "../models/Project";
import Blog from "../models/Blog";
import { NotFoundError } from "../utils/customErrors";
import { sendSuccess } from "../utils/response";

// General factory pattern or explicit handlers for clean TS compiler checks
// --- SKILLS ---
export async function createSkill(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Skill.create(req.body);
    sendSuccess(res, "Skill created.", { skill: item }, 201);
  } catch (error) { next(error); }
}
export async function getSkills(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Skill.find({}).sort("category");
    sendSuccess(res, "Skills fetched.", { skills: items });
  } catch (error) { next(error); }
}
export async function updateSkill(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new NotFoundError("Skill not found."));
    sendSuccess(res, "Skill updated.", { skill: item });
  } catch (error) { next(error); }
}
export async function deleteSkill(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Skill.findByIdAndDelete(req.params.id);
    if (!item) return next(new NotFoundError("Skill not found."));
    sendSuccess(res, "Skill deleted.");
  } catch (error) { next(error); }
}

// --- EXPERIENCE ---
export async function createExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Experience.create(req.body);
    sendSuccess(res, "Experience created.", { experience: item }, 201);
  } catch (error) { next(error); }
}
export async function getExperiences(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Experience.find({}).sort("-createdAt");
    sendSuccess(res, "Experiences fetched.", { experiences: items });
  } catch (error) { next(error); }
}
export async function updateExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new NotFoundError("Experience not found."));
    sendSuccess(res, "Experience updated.", { experience: item });
  } catch (error) { next(error); }
}
export async function deleteExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return next(new NotFoundError("Experience not found."));
    sendSuccess(res, "Experience deleted.");
  } catch (error) { next(error); }
}

// --- EDUCATION ---
export async function createEducation(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Education.create(req.body);
    sendSuccess(res, "Education created.", { education: item }, 201);
  } catch (error) { next(error); }
}
export async function getEducations(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Education.find({}).sort("-createdAt");
    sendSuccess(res, "Educations fetched.", { educations: items });
  } catch (error) { next(error); }
}
export async function updateEducation(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new NotFoundError("Education not found."));
    sendSuccess(res, "Education updated.", { education: item });
  } catch (error) { next(error); }
}
export async function deleteEducation(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) return next(new NotFoundError("Education not found."));
    sendSuccess(res, "Education deleted.");
  } catch (error) { next(error); }
}

// --- CERTIFICATES ---
export async function createCertificate(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Certificate.create(req.body);
    sendSuccess(res, "Certificate created.", { certificate: item }, 201);
  } catch (error) { next(error); }
}
export async function getCertificates(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Certificate.find({}).sort("-createdAt");
    sendSuccess(res, "Certificates fetched.", { certificates: items });
  } catch (error) { next(error); }
}
export async function updateCertificate(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new NotFoundError("Certificate not found."));
    sendSuccess(res, "Certificate updated.", { certificate: item });
  } catch (error) { next(error); }
}
export async function deleteCertificate(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Certificate.findByIdAndDelete(req.params.id);
    if (!item) return next(new NotFoundError("Certificate not found."));
    sendSuccess(res, "Certificate deleted.");
  } catch (error) { next(error); }
}

// --- SERVICES ---
export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Service.create(req.body);
    sendSuccess(res, "Service created.", { service: item }, 201);
  } catch (error) { next(error); }
}
export async function getServices(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Service.find({});
    sendSuccess(res, "Services fetched.", { services: items });
  } catch (error) { next(error); }
}
export async function updateService(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new NotFoundError("Service not found."));
    sendSuccess(res, "Service updated.", { service: item });
  } catch (error) { next(error); }
}
export async function deleteService(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Service.findByIdAndDelete(req.params.id);
    if (!item) return next(new NotFoundError("Service not found."));
    sendSuccess(res, "Service deleted.");
  } catch (error) { next(error); }
}

// --- TESTIMONIALS ---
export async function createTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Testimonial.create(req.body);
    sendSuccess(res, "Testimonial created.", { testimonial: item }, 201);
  } catch (error) { next(error); }
}
export async function getTestimonials(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Testimonial.find({});
    sendSuccess(res, "Testimonials fetched.", { testimonials: items });
  } catch (error) { next(error); }
}
export async function updateTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new NotFoundError("Testimonial not found."));
    sendSuccess(res, "Testimonial updated.", { testimonial: item });
  } catch (error) { next(error); }
}
export async function deleteTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return next(new NotFoundError("Testimonial not found."));
    sendSuccess(res, "Testimonial deleted.");
  } catch (error) { next(error); }
}

// --- SYNC INTERFACES ---
export async function getSyncData(req: Request, res: Response, next: NextFunction) {
  try {
    const [setting, skills, experiences, educations, certificates, services, projects, testimonials, blogs] = await Promise.all([
      Setting.findOne({}),
      Skill.find({}),
      Experience.find({}),
      Education.find({}),
      Certificate.find({}),
      Service.find({}),
      Project.find({}),
      Testimonial.find({}),
      Blog.find({})
    ]);

    const personalDetails = setting || {
      name: "Ajay Chavan",
      title: "Creative Full Stack Developer",
      subtitle: "Specializing in 3D Web Architecture, Interactive Frontend UI, & Scalable Backend Systems.",
      bio: "I am a Senior Full Stack Engineer who builds immersive web experiences.",
      resumeUrl: "#",
      email: "ajay.chavan@example.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
      stats: [],
      achievements: []
    };

    // Combine Experience and Education into a single timeline array
    const timeline = [
      ...experiences.map(exp => ({
        id: exp._id.toString(),
        type: "experience",
        roleOrDegree: exp.role,
        companyOrInstitution: exp.company,
        location: exp.location,
        duration: exp.duration,
        description: exp.description,
        bulletPoints: exp.bulletPoints
      })),
      ...educations.map(edu => ({
        id: edu._id.toString(),
        type: "education",
        roleOrDegree: edu.degree,
        companyOrInstitution: edu.school,
        location: edu.location,
        duration: edu.duration,
        description: edu.description,
        bulletPoints: edu.bulletPoints
      }))
    ];

    sendSuccess(res, "Sync data compiled.", {
      personalDetails,
      timeline,
      skills: skills.map(s => {
        const obj = s.toObject();
        obj.id = s._id.toString();
        return obj;
      }),
      services: services.map(s => {
        const obj = s.toObject();
        obj.id = s._id.toString();
        return obj;
      }),
      projects: projects.map(p => {
        const obj = p.toObject();
        obj.id = p._id.toString();
        return obj;
      }),
      certifications: certificates.map(c => {
        const obj = c.toObject();
        obj.id = c._id.toString();
        return obj;
      }),
      testimonials: testimonials.map(t => {
        const obj = t.toObject();
        obj.id = t._id.toString();
        return obj;
      }),
      blogs: blogs.map(b => {
        const obj = b.toObject();
        obj.id = b._id.toString();
        return obj;
      })
    });
  } catch (error) { next(error); }
}

export async function saveSyncData(req: Request, res: Response, next: NextFunction) {
  try {
    const { personalDetails, timeline, skills, services, projects, certifications, testimonials, blogs } = req.body;

    const clean = (items: any[]) => {
      if (!items || !Array.isArray(items)) return [];
      return items.map(item => {
        const copy = { ...item };
        delete copy._id;
        delete copy.id;
        delete copy.createdAt;
        delete copy.updatedAt;
        delete copy.__v;
        return copy;
      });
    };

    // Wipe and populate
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
    if (personalDetails) {
      const cleanDetails = { ...personalDetails };
      delete cleanDetails._id;
      delete cleanDetails.id;
      delete cleanDetails.createdAt;
      delete cleanDetails.updatedAt;
      delete cleanDetails.__v;
      insertPromises.push(Setting.create(cleanDetails));
    }
    if (skills && skills.length > 0) {
      insertPromises.push(Skill.insertMany(clean(skills)));
    }
    if (services && services.length > 0) {
      insertPromises.push(Service.insertMany(clean(services)));
    }
    if (projects && projects.length > 0) {
      insertPromises.push(Project.insertMany(clean(projects)));
    }
    if (certifications && certifications.length > 0) {
      insertPromises.push(Certificate.insertMany(clean(certifications)));
    }
    if (testimonials && testimonials.length > 0) {
      insertPromises.push(Testimonial.insertMany(clean(testimonials)));
    }
    if (blogs && blogs.length > 0) {
      insertPromises.push(Blog.insertMany(clean(blogs)));
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
        insertPromises.push(Experience.insertMany(experiencesToInsert));
      }
      if (educationsToInsert.length > 0) {
        insertPromises.push(Education.insertMany(educationsToInsert));
      }
    }

    await Promise.all(insertPromises);
    sendSuccess(res, "Sync data saved successfully.");
  } catch (error) { next(error); }
}
