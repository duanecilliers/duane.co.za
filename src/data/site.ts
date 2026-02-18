export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
  status: "active" | "shipped" | "client";
  featured: boolean;
}

export interface Hobby {
  name: string;
  emoji: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const siteData = {
  hero: {
    name: "Duane Cilliers",
    title: "I make things.",
    subtitle:
      "Sometimes with code. Sometimes with plastic. Always with intention.",
    location: "Cape Town, South Africa 🇿🇦",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/duanecilliers",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/duane-cilliers-34665915/",
        icon: "linkedin",
      },
      {
        name: "X",
        url: "https://x.com/duanecilliers",
        icon: "twitter",
      },
    ] as SocialLink[],
  },
  now: {
    updated: "February 2026",
    items: [
      "Freelancing with REW and Trust My Group",
      "Building side projects and exploring product ideas",
      "Learning the business side of shipping products",
      "Trying to practice drums more consistently",
    ],
  },
  projects: {
    featured: [
      {
        title: "Pomodorino",
        description:
          "A minimal Pomodoro timer for your menu bar. Native Swift, local analytics, no bloat. The timer for people who tried the others and got annoyed.",
        tech: ["Swift", "macOS", "SwiftUI"],
        url: "https://github.com/duanecilliers/Pomodorino",
        github: "https://github.com/duanecilliers/Pomodorino",
        status: "shipped" as const,
        featured: true,
      },
      {
        title: "TubeMind",
        description:
          "Chat with a YouTube creator's AI persona. Built from video transcripts, embeddings, and conversational AI.",
        tech: ["TypeScript", "Python", "FastAPI", "Next.js"],
        url: "https://github.com/duanecilliers/tubemind",
        github: "https://github.com/duanecilliers/tubemind",
        status: "shipped" as const,
        featured: true,
      },
    ] as Project[],
    client: [
      {
        title: "REW",
        description:
          "Real estate web platform serving thousands of agents across North America. Full-stack feature development.",
        tech: ["TypeScript", "React", "Next.js"],
        url: "https://rew.ca",
        status: "client" as const,
        featured: false,
      },
      {
        title: "Trust My Group",
        description:
          "Group management platform. PHP/Laravel backend with React/TypeScript dashboard SPA.",
        tech: ["PHP", "Laravel", "React", "TypeScript"],
        url: "https://trustmy.group",
        status: "client" as const,
        featured: false,
      },
    ] as Project[],
  },
  about: {
    paragraphs: [
      "I started as a frontend developer, spent years at a proptech startup, then went freelance. Now I'm building my own products while keeping the freelance engine running.",
      "My days split between client work — building full-stack web apps with TypeScript, Next.js, React, and Laravel — and side projects exploring AI and developer tools.",
      "I think in systems, ship in iterations, and believe the best products come from people who actually use them. Currently on the dev→entrepreneur arc, figuring it out as I go.",
    ],
  },
  hobbies: [
    {
      name: "Surfing",
      emoji: "🏄",
      description: "Chasing waves when Cape Town cooperates",
    },
    {
      name: "Brazilian Jiu-Jitsu",
      emoji: "🥋",
      description: "Planning to get back on the mats",
    },
    {
      name: "Drums",
      emoji: "🥁",
      description: "Trying to practice more in 2026",
    },
    {
      name: "3D Printing",
      emoji: "🖨️",
      description: "Bambu A1 Mini — making things IRL",
    },
  ] as Hobby[],
  contact: {
    email: "hello@duane.co.za",
    available: true,
    description:
      "I build full-stack web apps with Next.js, React, TypeScript, and Laravel. Currently available for freelance projects.",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Now", href: "#now" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Life", href: "#life" },
  ] as NavItem[],
};
