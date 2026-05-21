import type {
  Developer,
  Feature,
  NavItem,
  PricingPlan,
  Repository,
  Testimonial
} from "@/types/site";

export const navItems: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Explore", href: "/#explore" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" }
];

export const featureCards: Feature[] = [
  {
    title: "Smart Repository Management",
    description:
      "Organize monorepos, services, releases, environments, and contributor access from one command surface.",
    icon: "repo",
    signal: "42k repos indexed"
  },
  {
    title: "Branch & Commit Timeline",
    description:
      "Trace work from branch creation to deployment with visual commit maps and release-ready checkpoints.",
    icon: "branch",
    signal: "Live graph"
  },
  {
    title: "Pull Request Reviews",
    description:
      "Route review queues by owner, risk, dependency surface, and branch readiness without context loss.",
    icon: "pull",
    signal: "Review lanes"
  },
  {
    title: "Issue Tracking System",
    description:
      "Convert incidents, feature requests, and sprint work into connected engineering flows.",
    icon: "issue",
    signal: "Smart triage"
  },
  {
    title: "Team Collaboration Workspace",
    description:
      "Give product, security, QA, and engineering a shared operating layer for every repository.",
    icon: "team",
    signal: "Workspace sync"
  },
  {
    title: "AI Code Summaries",
    description:
      "Generate concise change intelligence for commits, releases, onboarding, and pull requests.",
    icon: "ai",
    signal: "Context aware"
  },
  {
    title: "One-click Deploy Preview",
    description:
      "Launch branch previews with deployment cards, status checks, logs, and rollback signals.",
    icon: "deploy",
    signal: "Preview ready"
  },
  {
    title: "Advanced Access Control",
    description:
      "Apply granular controls across organizations, teams, environments, and production workflows.",
    icon: "shield",
    signal: "Policy engine"
  },
  {
    title: "Repository Insights Analytics",
    description:
      "See velocity, hotspots, contributor balance, review load, and deployment health in one view.",
    icon: "analytics",
    signal: "Pulse metrics"
  }
];

export const categories = [
  "AI",
  "Web3",
  "SaaS",
  "DeFi",
  "GameFi",
  "Bots",
  "Infrastructure"
];

export const repositories: Repository[] = [
  {
    name: "neural-router",
    category: "AI",
    description: "Low-latency inference gateway with branch-level preview routing.",
    language: "TypeScript",
    stars: "18.4k",
    forks: "2.1k",
    accent: "cyan"
  },
  {
    name: "vaultmesh-protocol",
    category: "Web3",
    description: "Composable key orchestration toolkit for distributed applications.",
    language: "Rust",
    stars: "12.7k",
    forks: "940",
    accent: "mint"
  },
  {
    name: "saas-corekit",
    category: "SaaS",
    description: "Production-ready billing, tenant, audit, and role modules.",
    language: "Next.js",
    stars: "9.8k",
    forks: "1.4k",
    accent: "blue"
  },
  {
    name: "botflow-runtime",
    category: "Bots",
    description: "Event-driven automation runtime with deploy previews for bot teams.",
    language: "Go",
    stars: "7.3k",
    forks: "811",
    accent: "rose"
  },
  {
    name: "liquid-indexer",
    category: "DeFi",
    description: "Streaming market data indexer with typed settlement pipelines.",
    language: "Python",
    stars: "6.9k",
    forks: "688",
    accent: "mint"
  },
  {
    name: "arena-sync",
    category: "GameFi",
    description: "Multiplayer economy toolkit with replayable state snapshots.",
    language: "C#",
    stars: "5.8k",
    forks: "512",
    accent: "blue"
  },
  {
    name: "edge-mesh",
    category: "Infrastructure",
    description: "Global deployment orchestration for previews, logs, and rollbacks.",
    language: "Rust",
    stars: "14.1k",
    forks: "1.1k",
    accent: "cyan"
  }
];

export const developers: Developer[] = [
  { name: "Mira Chen", role: "Platform Lead", repos: 128, initials: "MC" },
  { name: "Owen Vale", role: "Open Source Maintainer", repos: 86, initials: "OV" },
  { name: "Nadia Frost", role: "AI Infra Engineer", repos: 64, initials: "NF" }
];

export const collections = [
  "Serverless starter systems",
  "Realtime collaboration kits",
  "Secure deployment workflows"
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    description: "For builders validating ideas and public repositories.",
    features: [
      "5 GB repository storage",
      "Unlimited public repositories",
      "3 private repositories",
      "Basic issue tracking",
      "Community deployment previews"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    description: "For solo developers shipping serious products.",
    featured: true,
    features: [
      "100 GB repository storage",
      "Unlimited private repositories",
      "Advanced collaboration tools",
      "AI code summaries",
      "Priority deploy previews"
    ]
  },
  {
    name: "Team",
    price: "$49",
    description: "For product teams working across services and releases.",
    features: [
      "500 GB shared storage",
      "Team workspaces",
      "Pull request routing",
      "Access policy controls",
      "Deployment status center"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced governance requirements.",
    features: [
      "Unlimited storage options",
      "SAML and SCIM access",
      "Dedicated AI governance",
      "Custom deployment rules",
      "Premium support channel"
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Ari Feld",
    role: "VP Engineering",
    company: "OrbitLayer",
    initials: "AF",
    quote:
      "GitClone gives our teams a single high-signal view of review risk, deploy previews, and repository health.",
    stats: "312 repositories migrated"
  },
  {
    name: "Selene Park",
    role: "Staff Developer Experience",
    company: "Northstar Labs",
    initials: "SP",
    quote:
      "The branch timeline and AI summaries changed how quickly new engineers understand production changes.",
    stats: "41% faster review cycles"
  },
  {
    name: "Mateo Silva",
    role: "Founder",
    company: "BuildPeak",
    initials: "MS",
    quote:
      "We use GitClone previews for every customer-facing branch. It feels polished, fast, and operationally clear.",
    stats: "1.8M monthly deployments"
  }
];

export const footerLinks = {
  Product: ["API", "Docs", "Community", "Status"],
  Company: ["Terms", "Privacy", "GitClone Cloud"],
  Social: ["X", "Discord", "LinkedIn", "Forum"]
};
