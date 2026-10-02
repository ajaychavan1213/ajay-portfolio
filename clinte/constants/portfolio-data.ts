export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  technologies: string[];
  github: string;
  demo: string;
  images: string[];
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'devops' | 'ai';
  level: number; // 0-100
  iconName: string;
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  roleOrDegree: string;
  companyOrInstitution: string;
  location: string;
  duration: string;
  description: string;
  bulletPoints: string[];
}

export interface Service {
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  verificationLink: string;
  iconName: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  feedback: string;
  avatar: string;
}

export interface Blog {
  title: string;
  date: string;
  readTime: string;
  summary: string;
  slug: string;
}

export const PERSONAL_DETAILS = {
  name: "Ajay Chavan",
  title: "Full Stack Software Engineer & Web Developer",
  subtitle: "Building Modern Web Applications, Interactive React/Next.js UIs & Scalable Backend APIs.",
  bio: "Enthusiastic Full Stack Developer and Computer Science Graduate from Dr. Babasaheb Ambedkar Marathwada University (BAMU), Chhatrapati Sambhajinagar. Specialized in building responsive frontend applications using React and Next.js, along with robust backend services in Node.js, Express, and MongoDB.",
  resumeUrl: "/resume.pdf",
  email: "chavanajay46926@gmail.com",
  githubUrl: "https://github.com/ajaychavan",
  linkedinUrl: "https://linkedin.com/in/ajaychavan",
  twitterUrl: "https://twitter.com/ajaychavan_dev",
  stats: [
    { label: "Status", value: "Fresher" },
    { label: "Projects Built", value: "15+" },
    { label: "Code Quality", value: "100%" },
    { label: "Core Stack", value: "MERN / Next.js" }
  ],
  achievements: [
    { title: "B.E. Computer Science Graduate", desc: "Graduated from Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar" },
    { title: "Full Stack Web Developer", desc: "Proficient in React, Next.js, Node.js, Express, MongoDB & Tailwind CSS" },
    { title: "Modern Portfolio & 3D Web UI", desc: "Engineered responsive full-stack applications with WebGL features" }
  ]
};

export const TIMELINE: TimelineItem[] = [
  {
    id: "exp-1",
    type: "experience",
    roleOrDegree: "Full Stack Developer (Projects & Freelance)",
    companyOrInstitution: "Self-Employed / Independent Developer",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    duration: "2024 - Present",
    description: "Building end-to-end full stack web applications, 3D WebGL user interfaces, and RESTful API backend microservices.",
    bulletPoints: [
      "Architected responsive React / Next.js 15 frontends with Tailwind CSS and Framer Motion micro-animations.",
      "Engineered backend APIs in Node.js & Express with MongoDB, handling secure JWT authentication and data models."
    ]
  },
  {
    id: "exp-2",
    type: "experience",
    roleOrDegree: "Web Development Intern",
    companyOrInstitution: "Tech Solutions",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    duration: "2024",
    description: "Assisted in building client web applications, database schema design, and responsive frontend components.",
    bulletPoints: [
      "Developed reusable React UI components and integrated RESTful endpoints for seamless user experiences.",
      "Optimized web application assets and layout responsiveness for mobile devices and tablets."
    ]
  },
  {
    id: "edu-1",
    type: "education",
    roleOrDegree: "Bachelor of Engineering in Computer Science",
    companyOrInstitution: "Dr. Babasaheb Ambedkar Marathwada University (BAMU)",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    duration: "2021 - 2025",
    description: "Graduated with Computer Science & Engineering degree. Specialized in Web Development, Software Engineering, Database Systems, and Object-Oriented Design.",
    bulletPoints: [
      "Built full-stack web applications for final year academic projects.",
      "Active participant in college technical symposiums and web development coding workshops."
    ]
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React / Next.js", category: "frontend", level: 95, iconName: "React" },
  { name: "TypeScript", category: "frontend", level: 90, iconName: "TypeScript" },
  { name: "Tailwind CSS", category: "frontend", level: 98, iconName: "Tailwind" },
  { name: "Three.js / R3F", category: "frontend", level: 85, iconName: "Three" },
  { name: "Framer Motion", category: "frontend", level: 92, iconName: "Motion" },
  { name: "GSAP", category: "frontend", level: 80, iconName: "Gsap" },
  
  // Backend
  { name: "Node.js", category: "backend", level: 88, iconName: "Node" },
  { name: "Express / NestJS", category: "backend", level: 82, iconName: "Express" },
  { name: "Next.js Route Handlers", category: "backend", level: 92, iconName: "Next" },
  { name: "GraphQL", category: "backend", level: 75, iconName: "Graphql" },
  
  // Databases
  { name: "PostgreSQL", category: "database", level: 85, iconName: "Postgres" },
  { name: "MongoDB", category: "database", level: 88, iconName: "Mongo" },
  { name: "Redis", category: "database", level: 78, iconName: "Redis" },
  { name: "Prisma ORM", category: "database", level: 90, iconName: "Prisma" },
  
  // Mobile
  { name: "React Native", category: "mobile", level: 82, iconName: "ReactNative" },
  { name: "Expo", category: "mobile", level: 85, iconName: "Expo" },

  // DevOps
  { name: "Docker", category: "devops", level: 80, iconName: "Docker" },
  { name: "AWS (S3, EC2)", category: "devops", level: 78, iconName: "Aws" },
  { name: "Vercel / Netlify", category: "devops", level: 95, iconName: "Vercel" },
  { name: "CI/CD (GitHub Actions)", category: "devops", level: 82, iconName: "GithubActions" },
  
  // AI Tools
  { name: "OpenAI API", category: "ai", level: 88, iconName: "Openai" },
  { name: "LangChain", category: "ai", level: 75, iconName: "Langchain" },
  { name: "Vector Databases (Pinecone)", category: "ai", level: 78, iconName: "Pinecone" }
];

export const SERVICES: Service[] = [
  {
    title: "Full Stack Engineering",
    description: "Building production-ready, performant web applications using Next.js, Node.js, and modern database infrastructures.",
    iconName: "Cpu",
    features: ["Serverless Architectures", "Secure User Authentication", "Database Optimization", "State-of-the-art SEO setups"]
  },
  {
    title: "3D & Interactive WebGL",
    description: "Crafting immersive 3D digital experiences that run natively inside browsers without plugins using React Three Fiber.",
    iconName: "Globe",
    features: ["Custom 3D Model Loading", "Dynamic Lighting & Shadows", "Mouse Parallax & Hover Tilts", "Shader Programming (GLSL)"]
  },
  {
    title: "AI-Powered Implementations",
    description: "Integrating modern LLM solutions and intelligent features to elevate user engagement and product value.",
    iconName: "Sparkles",
    features: ["Semantic Vector Search", "Context-Aware AI Assistants", "Automated Workflows", "Streaming Response Systems"]
  },
  {
    title: "UX/UI & Animation Systems",
    description: "Designing award-winning user interfaces featuring smooth scroll transitions, micro-animations, and premium looks.",
    iconName: "Palette",
    features: ["Framer Motion Masteries", "GSAP Timeline Animations", "Interactive Micro-Interactions", "Responsive Design Foundations"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "CyberSphere: WebGL Simulation Portal",
    category: "web3d",
    description: "An award-winning interactive 3D telemetry visualization dashboard with custom shader glowing effects.",
    details: "CyberSphere leverages React Three Fiber and GSAP ScrollTrigger to display intricate networking structures in 3D. Users can click on individual nodes to query server telemetry. Includes customizable orbit view modes, particle animations, and live mock WebSocket updates.",
    technologies: ["Next.js", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://github.com",
    images: [
      "/images/cybersphere-1.jpg",
      "/images/cybersphere-2.jpg",
      "/images/cybersphere-3.jpg"
    ],
    featured: true
  },
  {
    id: "proj-2",
    title: "AuraAI: Agentic Knowledge Base",
    category: "ai",
    description: "A serverless context-aware chat solution using vector searching and streaming OpenAI LLM responses.",
    details: "AuraAI provides real-time chatbot streaming responses based on local document database embeddings. Features a sleek glassmorphism dashboard, dynamic data visualization panels, and customizable system templates. Built using Vercel AI SDK and Pinecone.",
    technologies: ["Next.js", "OpenAI API", "Pinecone DB", "Zustand", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://github.com",
    images: [
      "/images/aura-1.jpg",
      "/images/aura-2.jpg"
    ],
    featured: true
  },
  {
    id: "proj-3",
    title: "MetaPay: Mobile Cryptocurrency Wallet",
    category: "mobile",
    description: "A React Native cryptocurrency tracking and transaction wallet app featuring biometric security.",
    details: "MetaPay handles crypto assets across multiple networks. Features a clean swipe-to-confirm wallet gesture, dynamic SVG graphing, biometric touch ID recognition, and automated dark theme switching. Leverages Expo and Tailwind Native.",
    technologies: ["React Native", "Expo", "Reanimated", "TypeScript", "Ethers.js"],
    github: "https://github.com",
    demo: "https://github.com",
    images: [
      "/images/metapay-1.jpg",
      "/images/metapay-2.jpg"
    ],
    featured: false
  },
  {
    id: "proj-4",
    title: "NovaCloud: DevOps Dashboard",
    category: "devops",
    description: "A central dashboard tracking Kubernetes container health, resource utilization, and deployment pipelines.",
    details: "NovaCloud compiles logs and telemetry across multi-region server clusters. Provides interactive heatmaps, real-time alert triggers via WebSockets, and automatic configuration builders. Engineered with Next.js Server Components and Recharts.",
    technologies: ["Next.js", "Docker", "AWS", "Socket.io", "Recharts"],
    github: "https://github.com",
    demo: "https://github.com",
    images: [
      "/images/novacloud-1.jpg"
    ],
    featured: false
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    verificationLink: "https://aws.amazon.com",
    iconName: "Aws"
  },
  {
    title: "Next.js Certified Developer",
    issuer: "Vercel",
    date: "2023",
    verificationLink: "https://vercel.com",
    iconName: "Vercel"
  },
  {
    title: "MongoDB Certified Developer Associate",
    issuer: "MongoDB Inc.",
    date: "2022",
    verificationLink: "https://mongodb.com",
    iconName: "Mongo"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "VP of Product",
    company: "FutureFlow Systems",
    feedback: "Ajay's ability to turn complex tech requirements into visually breathtaking 3D interfaces is unmatched. Our clients have been thoroughly impressed by the custom simulations he designed.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    name: "Marcus Aurelius",
    role: "Engineering Director",
    company: "Apex Ledger",
    feedback: "Exceptional code quality and deep expertise in Next.js. Ajay optimized our server components and restructured our Prisma schemas, leading to a huge boost in performance and developer velocity.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    name: "Aisha Rahman",
    role: "Founder",
    company: "Clarity AI",
    feedback: "We hired Ajay to design the interface for our new LLM platform. The resulting glassmorphism system is modern, intuitive, and works flawlessly across mobile and desktop. A stellar professional!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  }
];

export const BLOGS: Blog[] = [
  {
    title: "Mastering Performance in React Three Fiber Scenes",
    date: "July 12, 2026",
    readTime: "6 min read",
    summary: "A practical guide to instanced rendering, buffer attribute optimization, and shadow map baking to hit 60 FPS in WebGL.",
    slug: "mastering-performance-r3f"
  },
  {
    title: "Why We Switched to Next.js Server Actions for Secure Forms",
    date: "June 28, 2026",
    readTime: "4 min read",
    summary: "How Server Actions combined with Zod validation can dramatically simplify API routing and secure your database workflows.",
    slug: "nextjs-server-actions-zod"
  },
  {
    title: "Building Micro-Animations That Don't Hurt Web Vitals",
    date: "May 15, 2026",
    readTime: "5 min read",
    summary: "How to use GPU-accelerated CSS keyframes and optimized Framer Motion triggers to keep your cumulative layout shift at zero.",
    slug: "micro-animations-web-vitals"
  }
];
