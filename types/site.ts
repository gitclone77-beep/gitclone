export type IconName =
  | "repo"
  | "branch"
  | "commit"
  | "pull"
  | "issue"
  | "team"
  | "ai"
  | "deploy"
  | "shield"
  | "analytics"
  | "spark";

export type NavItem = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: IconName;
  signal: string;
};

export type Repository = {
  name: string;
  category: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  accent: string;
};

export type Developer = {
  name: string;
  role: string;
  repos: number;
  initials: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  features: string[];
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
  stats: string;
};
