export const siteConfig = {
  name: "NYRA Constructions",
  url: "https://nyraconstructions.in",
  phoneDisplay: "95352 77149",
  phoneE164: "+919535277149",
  whatsappNumber: "919535277149",
  address: {
    line1: "E Block, No. 235",
    line2: "J P Nagar, near 5th Cross & 17th Main",
    city: "Mysuru",
    state: "Karnataka",
    postalCode: "570008",
    country: "IN",
  },
  geo: {
    latitude: 12.26075,
    longitude: 76.64715,
  },
  hours: "Mon – Sat: 9:00 AM – 7:00 PM",
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Hello NYRA Constructions, I'd like to discuss a project.";

export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "Residential construction",
    description:
      "New homes and independent houses built from foundation to finishing, managed on-site from start to handover.",
  },
  {
    title: "Commercial construction",
    description:
      "Shops, offices and commercial spaces built to a schedule, with materials and labour coordinated in-house.",
  },
  {
    title: "Renovation & interiors",
    description:
      "Structural renovation, remodelling and interior work for existing homes and commercial units.",
  },
  {
    title: "Structural & RCC work",
    description:
      "Foundation, column and slab work engineered and executed to load and code, forming the base of every build.",
  },
  {
    title: "Site development & civil works",
    description:
      "Excavation, levelling, boundary walls and other groundwork that gets a plot ready to build on.",
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Site visit & consultation",
    description:
      "We visit the site, understand what you need and what the plot or existing structure allows for.",
  },
  {
    number: "02",
    title: "Estimate & planning",
    description:
      "A clear, itemised estimate and timeline, agreed before any work starts.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Construction or installation carried out with a single point of contact managing the site.",
  },
  {
    number: "04",
    title: "Handover & support",
    description:
      "Final walkthrough, handover, and continued support for maintenance and service work after.",
  },
];

export interface ProjectItem {
  tag: string;
  title: string;
  thumbClass: string;
}

export const projects: ProjectItem[] = [
  { tag: "Residential", title: "Independent house construction", thumbClass: "thumb-a" },
  { tag: "Commercial", title: "Retail space fit-out", thumbClass: "thumb-b" },
  { tag: "Renovation", title: "Home renovation & interiors", thumbClass: "thumb-c" },
  { tag: "Civil works", title: "Site development & boundary wall", thumbClass: "thumb-d" },
];

export const projectTypeOptions: string[] = [
  "Residential construction",
  "Commercial construction",
  "Renovation / interiors",
  "Structural / RCC work",
  "Site development / civil works",
  "Other",
];
