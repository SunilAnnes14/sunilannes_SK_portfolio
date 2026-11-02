/**
 * ============================================================================
 * INSIDE THE MACHINE // SUNIL ANNES S K - PORTFOLIO CONTENT DATA
 * ============================================================================
 * Edit your personal details, bio, skills, projects, timeline, and links here.
 * Everything on the site updates automatically when this file is modified.
 */

const PORTFOLIO_DATA = {
  // --- [1. PROFILE & IDENTITY] ---
  identity: {
    name: "Sunil Annes S K",
    callsign: "sunil@sk-linux",
    operatingSystem: "SK-Linux 1.0 LTS (x86_64)",
    kernel: "sk-kernel-5.15-ai-rt",
    title: "Inside the Machine // Sunil Annes S K",
    degree: "B.Tech Artificial Intelligence and Data Science",
    college: "Loyola-ICAM College of Engineering and Technology ", // Change to your college
    year: "3rd Year (Class of 2026)",
    location: "Chennai, India",
    status: "OPEN TO INTERNSHIPS & RESEARCH",
    portraitPath: "assets/portrait.jpg", // Crystal-clear high-res portrait!
    roles: [
      "Full-Stack Developer",
      "Angular + TypeScript Builder",
      "AI & Data Science Student",
      "Always Shipping Something New"
    ],
    bioBrief: "Full-Stack Developer & B.Tech AI & Data Science Student @ Loyola-ICAM.",
    bioTerminal: `const sunil = {
  location: "India 🇮🇳 (Chennai)",
  degree: "B.Tech Artificial Intelligence and Data Science",
  college: "Loyola-ICAM College of Engineering and Technology (LICET)",
  focus: ["Web Development", "Angular", "Full-Stack Systems", "AI & Machine Learning"],
  currentlyBuilding: "CareerGapAI & Retro CRT Web Architecture",
  currentlyLearning: ["Node.js", "Docker", "System Design", "Cloud Systems"],
  motto: "\\"First, solve the problem. Then, write the code.\\" -- John Johnson",
  status: "probably debugging with coffee ☕ [OPEN TO INTERNSHIPS]"
};`,
  },

  // --- [2. NEOFETCH SYSTEM INFO PANEL (WHOAMI PAGE)] ---
  neofetch: {
    asciiLogo: [
      "      .---.       ",
      "     /     \\      ",
      "    | () () |     ",
      "     \\  _  /      ",
      "      /   \\       ",
      "     |     |      ",
      "    /|     |\\     ",
      "   (_|     |_)    ",
      "     |_____|      ",
      "    /_______\\     "
    ],
    fields: [
      { label: "USER", value: "sunil@SunilAnnes14" },
      { label: "HOST", value: "Loyola-ICAM-Terminal [LICET]" },
      { label: "DEGREE", value: "B.Tech Artificial Intelligence & Data Science" },
      { label: "COLLEGE", value: "Loyola-ICAM College of Engg & Tech" },
      { label: "YEAR", value: "3rd Year / Batch 2022-2026" },
      { label: "STATUS", value: "● OPEN TO INTERNSHIPS & COLLABS", badge: true },
      { label: "FOCUS", value: "Full-Stack Dev, Angular, TypeScript, AI/ML" },
      { label: "LANGUAGES", value: "TypeScript, JavaScript, Python, SQL, Java, C" },
      { label: "FRONTEND", value: "Angular, React, Next.js, Tailwind CSS, RxJS" },
      { label: "BACKEND", value: "Node.js, Express, MongoDB, PostgreSQL, Flask" },
      { label: "TOOLS", value: "Docker, Git, GitHub, Linux, Vercel, Postman" },
      { label: "SHELL", value: "sksh v4.2" }
    ]
  },

  // --- [3. TECHNICAL SKILLS & EDITABLE PERCENTAGES (WHOAMI PAGE)] ---
  skills: [
    { name: "Angular & TypeScript", percentage: 90, category: "Frontend" },
    { name: "JavaScript & React", percentage: 85, category: "Frontend" },
    { name: "Python & Machine Learning", percentage: 85, category: "AI & Modeling" },
    { name: "Node.js & Express", percentage: 80, category: "Backend" },
    { name: "MongoDB & SQL", percentage: 85, category: "Databases" },
    { name: "Tailwind CSS & Modern UI", percentage: 90, category: "Frontend" },
    { name: "Docker & Linux Tools", percentage: 78, category: "DevOps & Tools" },
    { name: "Web3 & Solidity", percentage: 70, category: "Blockchain" }
  ],

  // --- [4. EDUCATION & ACHIEVEMENTS TIMELINE (WHOAMI PAGE)] ---
  timeline: [
    {
      period: "2022 - 2026 (PRESENT)",
      title: "B.Tech in Artificial Intelligence and Data Science",
      institution: "Loyola-ICAM College of Engineering and Technology (LICET)",
      description: "Focused on Linear Algebra, Neural Networks, Statistical Modeling, Big Data Systems, and Algorithm Optimization. Consistent academic excellence and technical club contributor."
    },
    {
      period: "2024 - 2025",
      title: "Full-Stack & AI Systems Builder",
      institution: "Open Source & Personal Research",
      description: "Architected and shipped CareerGapAI (Skill Dependency Engine), CineVault (Movie Review System in Angular & Signals), Kolly Guess Game (React 19 & Convex), and Web3 smart contract dApps."
    },
    {
      period: "2023 - 2024",
      title: "Full-Stack Web & Software Engineering",
      institution: "Technical Projects & Symposia",
      description: "Engineered scalable client-server applications using TypeScript, Angular, Node.js, Express, and MongoDB; mastered component state management and reactive programming with RxJS."
    },
    {
      period: "2020 - 2022",
      title: "Higher Secondary Certificate (HSC) - Computer Science",
      institution: "State Board of Education",
      description: "Graduated with distinction with strong foundations in Mathematics, Physics, and Object-Oriented Programming in C++ and Python."
    }
  ],

  // --- [5. 3D CARTRIDGES / PROJECTS (CARTRIDGES PAGE)] ---
  // Each cartridge has its own accent tint: amber (#ffb000), green (#33ff33), cyan (#00ffff), magenta (#ff33aa)
  projects: [
    {
      id: "cartridge-1",
      slotNumber: "ROM-01",
      title: "CareerGapAI: Career Gap Analyzer & Upskill Engine",
      subtitle: "AI Skill Gap Detection & Roadmap Generator",
      accent: "amber",
      accentHex: "#ffb000",
      description: "Intelligent career navigation engine that analyzes employment gaps, diagnoses missing skill dependencies, extracts live market evidence via SerpAPI, and automatically compiles structured priority upskilling roadmaps.",
      metrics: "Dynamic Skill Dependency Graph | Market-Aligned Roadmaps",
      tech: ["Python", "AI Algorithms", "SerpAPI", "FastAPI", "NLP"],
      repoLink: "https://github.com/SunilAnnes14/CareerGapAI",
      demoLink: "https://github.com/SunilAnnes14/CareerGapAI"
    },
    {
      id: "cartridge-2",
      slotNumber: "ROM-02",
      title: "Loan Approval ML: Financial Risk Classifier",
      subtitle: "Machine Learning & Credit Scoring",
      accent: "green",
      accentHex: "#33ff33",
      description: "End-to-end predictive machine learning model evaluating applicant creditworthiness and default probabilities using exploratory data analysis, feature engineering, and supervised classification on financial loan data.",
      metrics: "High Classification ROC-AUC | Rigorous Cross-Validation",
      tech: ["Python", "Jupyter", "Scikit-Learn", "Pandas", "Matplotlib"],
      repoLink: "https://github.com/SunilAnnes14/loan_project_ML",
      demoLink: "https://github.com/SunilAnnes14/loan_project_ML"
    },
    {
      id: "cartridge-3",
      slotNumber: "ROM-03",
      title: "Kolly Guess Game: Real-Time Cinema Challenge",
      subtitle: "React 19, Three.js & Convex DApp",
      accent: "cyan",
      accentHex: "#00f0ff",
      description: "Fast-paced interactive Kollywood cinema guessing game featuring 3D visual models via Three.js, real-time multiplayer backend & auth powered by Convex, Framer Motion transitions, and modern Tailwind v4 styling.",
      metrics: "Sub-50ms Sync via Convex | 60 FPS Three.js Canvas",
      tech: ["React 19", "Three.js", "TypeScript", "Convex DB", "Tailwind v4", "Framer Motion"],
      repoLink: "https://github.com/SunilAnnes14/kolly-guess-game",
      demoLink: "https://attividuuu.vercel.app/"
    },
    {
      id: "cartridge-4",
      slotNumber: "ROM-04",
      title: "CineVault: Full-Stack Movie Review System",
      subtitle: "Angular Signals & Full-Stack Node/Mongo",
      accent: "magenta",
      accentHex: "#ff33bb",
      description: "Comprehensive movie discovery platform featuring real-time search, multi-genre filtering, reactive 5-star rating mechanisms, cinematic backdrop views, trailer embeds, and RESTful API backend architecture.",
      metrics: "Reactive Angular Signals | Scalable MongoDB Aggregations",
      tech: ["Angular", "Node.js", "Express", "MongoDB", "REST API", "TypeScript"],
      repoLink: "https://github.com/SunilAnnes14/movie-review-system",
      demoLink: "https://github.com/SunilAnnes14/movie-review-system"
      
    },
    {
      id: "cartridge-5",
      slotNumber: "ROM-05",
      title: "Hello Blockchain: Ethereum Smart Contract DApp",
      subtitle: "Solidity & Hardhat Web3 Architecture",
      accent: "amber",
      accentHex: "#ffb000",
      description: "Decentralized Web3 application demonstrating end-to-end integration between a TypeScript frontend and a Solidity smart contract deployed on a local Hardhat blockchain using Ethers.js transaction pipelines.",
      metrics: "Zero-Gas Local Testing | Cryptographic State Verification",
      tech: ["Solidity", "Hardhat", "Ethers.js", "TypeScript", "Web3"],
      repoLink: "https://github.com/SunilAnnes14/hello-blockchain",
      demoLink: "https://github.com/SunilAnnes14/hello-blockchain"
    }
  ],

  // --- [6. SOCIAL LINKS AS HARDWARE PORTS / CABLES (TRANSMIT PAGE)] ---
  socialPorts: [
    {
      portNumber: "PORT-8022",
      protocol: "SSH / VCS",
      label: "GitHub",
      url: "https://github.com/SunilAnnes14", // Change to your GitHub URL
      displayHost: "github.com/SunilAnnes14",
      indicator: "ONLINE"
    },
    {
      portNumber: "PORT-0443",
      protocol: "NET / TLS",
      label: "LinkedIn",
      url: "https://linkedin.com", // Change to your LinkedIn URL
      displayHost: "linkedin.com/in/sunil-annes",
      indicator: "LINKED"
    },
    {
      portNumber: "PORT-8080",
      protocol: "DATA / ML",
      label: "Kaggle",
      url: "https://kaggle.com", // Change to your Kaggle URL
      displayHost: "kaggle.com/sunilannes",
      indicator: "READY"
    },
    {
      portNumber: "PORT-0025",
      protocol: "SMTP / MAIL",
      label: "Email Uplink",
      url: "mailto:annessunil14@gmail.com", // Change to your Email address
      displayHost: "annessunil14@gmail.com",
      indicator: "LISTEN"
    }
  ],

  // --- [7. BIOS POST BOOT SEQUENCE LINES (BOOT PAGE)] ---
  biosLines: [
    "SK-BIOS v3.42 (C) 1988-2026 SUNIL ANNES S K SYSTEMS INC.",
    "CPU: SYNAPSE-64 NEURAL MATRIX PROCESSOR @ 3.80GHz",
    "CHECKING MEMORY: 65,536 KB SYSTEM RAM ......... [ OK ]",
    "DETECTING VIRTUAL AI CARTRIDGE BAY ........... [ 5 SLOTS READY ]",
    "INITIALIZING SK-KERNEL 1.0 LTS ............... [ OK ]",
    "STARTING TENSOR COMPUTE ENGINE ............... [ ACTIVE ]",
    "MOUNTING /dev/portfolio ON /root .............. [ MOUNTED ]",
    "ESTABLISHING CONSOLE DISPLAY SUBSYSTEM ....... [ CRT READY ]"
  ]
};

// Export to window for global access across scripts
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
