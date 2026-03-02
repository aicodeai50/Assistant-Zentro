export type FacultyId =
  | "stem-it"
  | "business"
  | "medicine"
  | "law-social"
  | "arts-humanities"
  | "education"
  | "custom";

export type Faculty = {
  id: FacultyId;
  name: string;
  accent: string;
  tagline: string;
  examples: string[];
};

export const FACULTIES: Record<FacultyId, Faculty> = {
  "stem-it": {
    id: "stem-it",
    name: "STEM & IT",
    accent: "#22D3EE",
    tagline: "Algorithms, systems, math, data, engineering.",
    examples: ["SQL joins", "Big-O analysis", "Operating systems", "Discrete math"],
  },
  business: {
    id: "business",
    name: "Business & Economics",
    accent: "#A3E635",
    tagline: "Models, markets, decisions, strategy.",
    examples: ["Supply & demand", "DCF valuation", "Game theory", "Marketing funnels"],
  },
  medicine: {
    id: "medicine",
    name: "Medicine & Health",
    accent: "#FB7185",
    tagline: "Clinical logic, mechanisms, recall + application.",
    examples: ["Cardiac cycle", "Pharmacology", "Pathways", "Symptoms → diagnosis"],
  },
  "law-social": {
    id: "law-social",
    name: "Law & Social Sciences",
    accent: "#B48CFF",
    tagline: "Arguments, cases, theory, structure.",
    examples: ["Issue spotting", "Case brief", "Argument structure", "Legal reasoning"],
  },
  "arts-humanities": {
    id: "arts-humanities",
    name: "Arts & Humanities",
    accent: "#38BDF8",
    tagline: "Meaning, critique, interpretation, creation.",
    examples: ["Text analysis", "Critical theory", "Historical timelines", "Language practice"],
  },
  education: {
    id: "education",
    name: "Education",
    accent: "#34D399",
    tagline: "Teaching skill, pedagogy, classroom decisions.",
    examples: ["Lesson planning", "Assessment design", "Learning science", "Classroom scenarios"],
  },
  custom: {
    id: "custom",
    name: "Custom / Interdisciplinary",
    accent: "#F59E0B",
    tagline: "For mixed programs and unique paths.",
    examples: ["Cross-domain synthesis", "Project-based learning", "Research mapping", "Combine disciplines"],
  },
};

export function getFacultyFromSearchParam(param: string | null | undefined): Faculty {
  const key = (param ?? "stem-it") as FacultyId;
  return FACULTIES[key] ?? FACULTIES["stem-it"];
}
