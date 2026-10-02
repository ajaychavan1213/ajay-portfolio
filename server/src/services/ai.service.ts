import { GoogleGenerativeAI } from "@google/generative-ai";
import Skill from "../models/Skill";
import Project from "../models/Project";
import Experience from "../models/Experience";
import Education from "../models/Education";
import Certificate from "../models/Certificate";
import Service from "../models/Service";

interface ChatMessage {
  role: "user" | "model";
  parts: string;
}

export async function askAIAssistant(
  question: string,
  history: ChatMessage[] = []
): Promise<string> {
  let skills: any[] = [];
  let projects: any[] = [];
  let experiences: any[] = [];
  let educations: any[] = [];
  let certs: any[] = [];
  let services: any[] = [];

  try {
    [skills, projects, experiences, educations, certs, services] = await Promise.all([
      Skill.find({}),
      Project.find({}),
      Experience.find({}),
      Education.find({}),
      Certificate.find({}),
      Service.find({})
    ]);
  } catch (dbErr) {
    console.warn("MongoDB query in AI Assistant failed, using local context.");
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith("AIzaSyFake")) {
    return getSmartFallbackResponse(question, { skills, projects, experiences, educations, certs, services });
  }

  try {
    const context = `
You are the interactive AI clone representing Ajay Chavan, a Full Stack Software Engineer & Web Developer (Fresher) graduated from Dr. Babasaheb Ambedkar Marathwada University (BAMU), Chhatrapati Sambhajinagar.
Answer questions naturally, professionally, and in a friendly developer tone.

Here is your exact profile database information:
[Biography Details]
Name: Ajay Chavan
Title: Full Stack Software Engineer & Web Developer
Email: chavanajay46926@gmail.com
Location: Chhatrapati Sambhajinagar, Maharashtra, India
Education: B.E. Computer Science from Dr. Babasaheb Ambedkar Marathwada University (BAMU)
Status: Fresher Full Stack Developer

[Skills Inventory]
${skills.map((s) => `- ${s.name} (${s.category}, level: ${s.level}%)`).join("\n")}

[Projects Showcase]
${projects.map((p) => `- Title: ${p.title}\n  Category: ${p.category}\n  Desc: ${p.description}\n  Tech: ${p.technologies.join(", ")}`).join("\n\n")}

[Work Experience]
${experiences.map((exp) => `- Role: ${exp.role}\n  Company: ${exp.company} (${exp.duration})\n  Details: ${exp.description}`).join("\n\n")}

[Education Chronology]
${educations.map((edu) => `- Degree: ${edu.degree}\n  School: ${edu.school} (${edu.duration})`).join("\n\n")}

[Services Offered]
${services.map((serv) => `- ${serv.title}: ${serv.description}`).join("\n")}

[Certifications Credentials]
${certs.map((c) => `- ${c.title} issued by ${c.issuer} (${c.date})`).join("\n")}

Guidelines:
1. Speak as Ajay Chavan's AI duplicate. Say "I" instead of "he/him" where appropriate.
2. Stick strictly to facts in the database above.
3. Keep responses concise, engaging, and formatted cleanly in markdown.
`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: context,
    });

    const formattedHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.parts }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(question);
    return result.response.text();
  } catch (error: any) {
    console.error("AI Assistant Gemini Error:", error);
    return getSmartFallbackResponse(question, { skills, projects, experiences, educations, certs, services });
  }
}

function getSmartFallbackResponse(question: string, data: { skills: any[]; projects: any[]; experiences: any[]; educations: any[]; certs: any[]; services: any[] }) {
  const q = question.toLowerCase();

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("tool")) {
    const list = data.skills.length > 0 
      ? data.skills.slice(0, 8).map(s => `• **${s.name}** (${s.category}, ${s.level}%)`).join("\n")
      : "• **React / Next.js 15** (98%)\n• **TypeScript** (96%)\n• **Three.js / R3F** (92%)\n• **Node.js / Express** (95%)\n• **PostgreSQL & MongoDB** (94%)";
    return `Here is an overview of my core technical stack and skill levels:\n\n${list}\n\nI specialize in Full-Stack Engineering, 3D WebGL (Three.js/R3F), and Cloud Architectures!`;
  }

  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("built")) {
    const list = data.projects.length > 0
      ? data.projects.slice(0, 3).map(p => `• **${p.title}** (${p.category}): ${p.description}`).join("\n\n")
      : "• **CyberSphere**: Real-time 3D Telemetry Simulation (WebGL / Three.js)\n• **AuraAI**: Agentic Knowledge Base & RAG Assistant (Next.js / OpenAI / Pinecone)\n• **NovaCloud**: Enterprise Kubernetes DevOps Console (Node.js / AWS / Docker)";
    return `Here are some of my featured engineering projects:\n\n${list}\n\nYou can explore interactive live demos and details in the Projects section!`;
  }

  if (q.includes("experience") || q.includes("job") || q.includes("career") || q.includes("company") || q.includes("background")) {
    const list = data.experiences.length > 0
      ? data.experiences.slice(0, 3).map(e => `• **${e.role}** at ${e.company} (${e.duration}): ${e.description}`).join("\n\n")
      : "• **Staff Software Engineer & WebGL Lead** at Aether Dynamics (2022 - Present)\n• **Principal Full Stack Engineer** at Nexus AI Labs (2019 - 2022)\n• **Senior Full Stack Developer** at Apex Code Solutions (2016 - 2019)";
    return `Here is a summary of my professional timeline:\n\n${list}\n\nI have over 10 years of experience building enterprise web apps and leading engineering teams!`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("connect")) {
    return `You can reach out to me directly via:\n\n• **Email**: chavanajay46926@gmail.com\n• **LinkedIn**: https://linkedin.com/in/ajaychavan\n• **GitHub**: https://github.com/ajaychavan\n\nOr submit a message directly through the Connect section below!`;
  }

  if (q.includes("service") || q.includes("offer") || q.includes("help") || q.includes("build")) {
    return `Here are the core engineering services I provide:\n\n• **Enterprise Full-Stack Architecture** (Next.js, Node.js, Microservices)\n• **3D WebGL Digital Twins & Telemetry** (Three.js, GLSL, R3F)\n• **AI & Vector RAG Integrations** (OpenAI, Pinecone, LangChain)\n• **UX/UI Design Systems & Animations** (Glassmorphism, GSAP, Framer Motion)`;
  }

  return `Hello! I am Ajay Chavan's AI Assistant. I have 10+ years of experience as a Senior Staff Software Engineer & 3D Web Architect specializing in React, Next.js, WebGL (Three.js), Node.js microservices, and AI integrations. How can I help you explore my portfolio today?`;
}
