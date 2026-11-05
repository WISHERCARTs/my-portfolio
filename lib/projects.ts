/** Project cards on /projects and the home page. The chat assistant's prompt is built from this list too. */
export const projects = [
  {
    title: "Local Soul",
    highlight: "I built its chatbot: vector search finds the places and Typhoon writes the answer in Thai.",
    description:
      "Team project from the Botnoi internship: an AI travel companion that plans a day hour by hour on a map. I built its chatbot, a RAG endpoint that finds places with vector search and has the Typhoon LLM write recommendations in Thai, connected to Botnoi's chat widget.",
    image: "/images/local-soul/home.jpg",
    tags: ["Next.js", "RAG", "Typhoon LLM", "Botnoi"],
    demo: "https://local-soul-gamma.vercel.app/",
    demoImages: ["/images/local-soul/home.jpg"],
  },
  {
    title: "Thai RAG with Evaluation",
    caseStudy: "thai-rag-eval",
    highlight: "The source passage landed in the top 3 for all 80 questions, and all 10 unanswerable ones were refused.",
    description:
      "Thai question answering over 40 Thai Wikipedia articles, with an evaluation harness that measures it. On 80 questions, Gemini embedding search put the source passage in the top 3 every time, while BM25 over PyThaiNLP word segmentation missed 4. Answers cite their sources and refused all 10 questions the articles could not answer.",
    image: "/images/thai-rag/cover.svg",
    tags: ["Python", "RAG", "Google Gemini API", "PyThaiNLP", "BM25", "Evaluation"],
    github: "https://github.com/WISHERCARTs/thai-rag-eval",
    demoImages: ["/images/thai-rag/cover.svg"],
  },
  {
    title: "Thai RAG Agents",
    caseStudy: "thai-rag-agents",
    highlight: "Three agents on Google ADK. 17 of 20 answers correct, and after one instruction fix every answer carries citations.",
    description:
      "Multi-agent question answering over Thai Wikipedia on Google's Agent Development Kit. A coordinator splits a question into one lookup per place, a researcher searches with the hybrid retriever from Thai RAG, and a fact checker verifies the draft. On a 20-question evaluation, 17 answers were judged correct, every expected article was found, and the three unanswerable questions were refused. A second run, after tightening one instruction, kept accuracy at 17 of 20 but made every answer carry its citations (10 of 17 before) and ran the fact checker on every answerable question. The README breaks down the three misses: one bad reference, one real retrieval failure, and one decimal-rounding verdict.",
    image: "/images/thai-rag-agents/cover.svg",
    tags: ["Python", "Google ADK", "Multi-agent", "Google Gemini API", "Evaluation"],
    github: "https://github.com/WISHERCARTs/thai-rag-agents",
    demoImages: [
      "/images/thai-rag-agents/cover.svg",
      "/images/thai-rag-agents/results.svg",
      "/images/thai-rag-agents/trace.svg",
    ],
  },
  {
    title: "Tournament Hub",
    caseStudy: "tournament-hub",
    highlight: "Built for the MU Esports club: five bracket formats, live public results, 71 merged pull requests.",
    description:
      "Tournament platform I built for the MU Esports club at Mahidol University. Organizers run brackets in five formats (single and double elimination, round robin, Swiss, free-for-all) and Valorant map pick/ban rooms, and anyone can follow results live from a public link with no account. Access rules and bracket logic live in PostgreSQL (Row Level Security and PL/pgSQL functions). It holds the real schedule of the EG faculty's upcoming Valorant and ROV tournaments. Built with Claude Code, an AI coding agent: I set the requirements, make the decisions and review every change, and it writes most of the code. 71 merged pull requests and 25 SQL migrations. The demo is the finished archive of the MU Game 2026 (March) inter-faculty Valorant tournament, 13 to 25 March 2026: three round-robin groups, a double-elimination play-off and the map pick/ban records. The source code is private.",
    image: "/images/tournament-hub/cover.svg",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL", "Realtime", "Tailwind CSS"],
    demo: "https://tournamenthubth.vercel.app/e/mu-game-2026-march",
    demoImages: ["/images/tournament-hub/cover.svg"],
  },
  {
    title: "Tournament Hub Agent",
    caseStudy: "tournament-hub-agent",
    highlight: "An MCP server that changes tournament data only with the organizer's permissions: 35 of 36 eval tasks right, 0 unwanted changes.",
    description:
      "MCP server that lets an AI assistant (Claude Desktop, Claude Code or any MCP client) read Tournament Hub and move a match, rename a team or save a result for an organizer. Every change is proposed first and made only after the user confirms. It signs in with an access code, so Row Level Security and the database's own checks decide what it may do. 28 tests force changes past the confirmation step as users without permission and show the database refuses them; a Gemini eval of 36 tasks, including prompt injection through a team name, ended at 35 right and 0 unwanted changes. Built with Claude Code: I set the requirements, made the decisions and reviewed every change. The source code is private.",
    image: "/images/tournament-hub-agent/cover.svg",
    tags: ["TypeScript", "MCP", "Supabase", "PostgreSQL", "Google Gemini API", "LLM evaluation"],
    demoImages: ["/images/tournament-hub-agent/cover.svg"],
  },
  {
    title: "MU Esports Website",
    caseStudy: "mu-esports-website",
    highlight: "The club's official site, built with an AI coding agent: 12 smoke tests in CI and images cut by 55%.",
    description:
      "Official website of the Mahidol University esports club, in Thai and English with light and dark themes. I own the project and direct Claude Code, an AI coding agent, which writes most of the code: I set the requirements, make the decisions and review every change before merging. In November 2026 it gained a link-in-bio landing page that replaced Linktree in the club's bios, share cards and WebP images (public/ went from 6.0 MB to 2.7 MB), a one-screen desktop layout, cookie-free analytics and 12 Playwright smoke tests in CI. Deployed on Cloudflare Workers. The source code is private.",
    image: "/images/mu-esports-website/link-in-bio.webp",
    tags: ["React", "Vite", "Playwright", "GitHub Actions", "Cloudflare Workers", "AI-assisted"],
    demo: "https://mu-esports-website.muesport2567.workers.dev",
    demoImages: [
      "/images/mu-esports-website/link-in-bio.webp",
      "/images/mu-esports-website/home.webp",
    ],
  },
  {
    title: "MLP Digit Recognition",
    description:
      "Handwritten digit recognition using Multi-Layer Perceptron (MLP) with Streamlit web interface",
    image: "/images/MLP/MLP_1.jpeg",
    tags: ["Python", "Scikit-learn", "Streamlit", "MLP"],
    github: "https://github.com/WISHERCARTs/MLP-Digit-Recognition",
    demo: "https://mlp-wishercarts.streamlit.app/",
    demoImages: [
      "/images/MLP/MLP_1.jpeg",
      "/images/MLP/MLP_2.jpeg",
      "/images/MLP/MLP_3.jpeg",
      "/images/MLP/MLP_4.jpeg",
    ],
  },
  {
    title: "Face Recognition System",
    description:
      "An end-to-end face identification system using PCA for dimensionality reduction and SVM for classification. Features a user-friendly Streamlit web interface for real-time face recognition.",
    image: "/images/Face/wishercarts-face-recognition_1.jpeg",
    tags: ["Python", "Scikit-learn", "OpenCV", "Streamlit", "PCA", "SVM"],
    github: "https://github.com/WISHERCARTs/face-recognition-system",
    demo: "https://wishercarts-face-recognition-system-app-vti7zr.streamlit.app/",
    demoImages: [
      "/images/Face/face_2.png",
      "/images/Face/face_3.jpeg",
      "/images/Face/face_4.jpeg",
      "/images/Face/face_5.jpeg",
    ],
  },
  {
    title: "AI Automation Bot",
    description:
      "A serverless bot that monitors tech news 24/7, uses AI to summarize content, and automatically updates the database without human intervention.",
    image: "/images/n8n_tech_news/n8n1.png",
    tags: ["n8n", "Google Gemini", "Google Sheets"],
    github: "https://github.com/WISHERCARTs/n8n-automation-Tech-News-summerize",
    demoImages: [
      "/images/n8n_tech_news/n8n1.png",
      "/images/n8n_tech_news/n8n2.png",
      "/images/n8n_tech_news/n8n_sheet.png",
    ],
  },
  {
    title: "Portfolio AI Chatbot",
    caseStudy: "portfolio-chatbot",
    highlight: "Fact-checked in CI against the site's own data: 12 of 12 eval questions pass on the real model.",
    description:
      "The Gemini chat assistant on this site, which answers in Thai or English about my projects, certificates and background. Its prompt is built from the same data the pages show, and every pull request that touches that data asks the real assistant 12 questions and fails if it contradicts the site. The eval caught it answering English questions in Thai; a prompt rule did not fix that, a server-side fix did. Built with Claude Code: I set the requirements, made the decisions and reviewed every change.",
    image: "/images/AI_chatbot/MyWebHome2.png",
    tags: ["Next.js", "TypeScript", "Google Gemini API", "AI SDK", "LLM evaluation", "GitHub Actions"],
    github: "https://github.com/WISHERCARTs/my-portfolio",
    demo: "https://my-portfolio-wish.vercel.app/",
    demoImages: [
      "/images/AI_chatbot/MyWebHome.png",
      "/images/AI_chatbot/MyWebHome2.png",
    ],
  },
  {
    title: "CD Keys Website",
    description:
      "Developed a CD-Key marketplace platform for the 'Web Technologies and Application' class using React, Vite, Node.js, and MySQL. Responsible for the entire Frontend development, designing a responsive user interface with React and Vite. Led the system integration by handling API consumption and data binding to connect the UI with the Node.js backend and MySQL database. Managed state for key features including JWT Authentication and Search functionalities.",
    image: "/images/CDkeys/CDkeys_Home.png",
    tags: ["React", "Node.js", "Tailwind CSS", "MySQL", "Express"],
    github: "https://github.com/WISHERCARTs/Ayema5kon-project",
    demoImages: [
      "/images/CDkeys/CDkeys_Home.png",
      "/images/CDkeys/CDkeys_Products.png",
      "/images/CDkeys/CDkeys_search.png",
      "/images/CDkeys/CDkeys_cart.png",
      "/images/CDkeys/CDkeys_keys.png",
      "/images/CDkeys/CDkeys_profile.png",
      "/images/CDkeys/CDkeys_how-to-pay.png",
      "/images/CDkeys/CDkeys_about1.png",
      "/images/CDkeys/CDkeys_about2.png",
      "/images/CDkeys/CDkeys_about3.png",
      "/images/CDkeys/CDkeys_admin_products.png",
      "/images/CDkeys/CDkeys_admin_users.png",
    ],
  },
  {
    title: "R-Data-Science-Labs",
    description:
      "A collection of R programming labs from ITDS125 - Introduction to Data Science course. Covers R basics, data visualization, statistical testing, and data manipulation.",
    image: "/images/R_Lab/R_Lab1.jpeg",
    tags: ["R", "Data Science", "ggplot2", "tidyverse"],
    github: "https://github.com/WISHERCARTs/R-Data-Science-Labs/tree/main",
    demoImages: [
      "/images/R_Lab/R_Lab1.jpeg",
      "/images/R_Lab/R_Lab2.jpeg",
      "/images/R_Lab/R_Lab3.jpeg",
      "/images/R_Lab/R_Lab4.jpeg",
      "/images/R_Lab/R_Lab5.jpeg",
      "/images/R_Lab/R_Lab6.jpeg",
    ],
  },
  {
    title: "Fuwari Time",
    description:
      "Gamified Pomodoro & study companion mobile app with a virtual companion, Lo-fi music shop, and weather-synced ambience. Built as ITDS283 Mobile Application Development group project.",
    image: "/images/FuwariTime/day.jpg",
    tags: ["Flutter", "Dart", "Supabase", "Provider", "OpenWeatherMap API"],
    github: "https://github.com/WISHERCARTs/ITDS283-FuwariTime-6787003-6787074",
    demoImages: [
      "/images/FuwariTime/day.jpg",
      "/images/FuwariTime/night.jpg",
      "/images/FuwariTime/shop.jpg",
    ],
  },
  {
    title: "LINE OA AI Chatbot",
    description:
      "Thai-language LINE Official Account chatbot on FastAPI and the Google Gemini API. It rejects requests without a valid LINE signature, reads its system prompt from a file so edits apply without a restart, and is covered by 17 pytest tests, a Docker image and GitHub Actions CI. Deployed on Google Cloud Run.",
    image: "/images/line-chatbot/cover.svg",
    tags: ["Python", "FastAPI", "Google Gemini API", "LINE Bot SDK", "Docker", "Cloud Run"],
    github: "https://github.com/WISHERCARTs/line-ai-chatbot-gemini",
    demoImages: ["/images/line-chatbot/cover.svg"],
  },
];

export type Project = (typeof projects)[number];
