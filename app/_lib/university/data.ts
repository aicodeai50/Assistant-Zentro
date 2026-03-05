export type UniDepartmentKey =
  | "student-hub"
  | "teacher-office"
  | "tutor-center"
  | "library"
  | "classrooms"
  | "research-lab"
  | "career-services";

export type UniDepartment = {
  key: UniDepartmentKey;
  title: string;
  subtitle: string;
  tags: string[];
  highlights: string[];
};

export type UniFaculty = {
  slug: string;
  key: string;
  name: string;
  degree: "BA" | "BSc" | "BEng" | "LLB" | "BBA" | "BEd" | "BHealth";
  summary: string;
  departments: UniDepartmentKey[];
  focusAreas: string[];
  featuredBooks: Array<{ title: string; author: string; year?: string }>;
};

export const DEPARTMENTS: Record<UniDepartmentKey, UniDepartment> = {
  "student-hub": {
    key: "student-hub",
    title: "Student Hub",
    subtitle: "Enrollment, schedules, study planning, and student success support.",
    tags: ["Planning", "Support", "Resources"],
    highlights: ["Study roadmap builder", "Semester planning", "Student support desk", "Success check-ins"],
  },
  "teacher-office": {
    key: "teacher-office",
    title: "Teacher Office",
    subtitle: "Faculty office hours, feedback, grading policies, and course guidance.",
    tags: ["Office hours", "Feedback", "Guidance"],
    highlights: ["Book office hours", "Feedback workflow", "Assessment rubrics", "Course guidance"],
  },
  "tutor-center": {
    key: "tutor-center",
    title: "Tutor Center",
    subtitle: "Targeted help for assignments, exam preparation, and learning gaps.",
    tags: ["Tutoring", "Assignments", "Exams"],
    highlights: ["Tutor matching", "Exam drill sessions", "Study technique coaching", "Problem walkthroughs"],
  },
  library: {
    key: "library",
    title: "Library",
    subtitle: "Curated books, reading lists, notes, and high-quality learning material.",
    tags: ["Books", "Reading lists", "Notes"],
    highlights: ["Faculty reading lists", "Digital shelves", "Searchable notes", "Citation helpers"],
  },
  classrooms: {
    key: "classrooms",
    title: "Classrooms",
    subtitle: "Structured lessons, modules, and practice-based learning experiences.",
    tags: ["Lessons", "Modules", "Practice"],
    highlights: ["Lesson modules", "Exercises", "Progress tracking", "Peer discussion boards"],
  },
  "research-lab": {
    key: "research-lab",
    title: "Research Lab",
    subtitle: "For researchers and advanced learners: projects, papers, and methods.",
    tags: ["Research", "Methods", "Projects"],
    highlights: ["Research templates", "Paper reading workflow", "Method guides", "Project boards"],
  },
  "career-services": {
    key: "career-services",
    title: "Career Services",
    subtitle: "Career planning, CV review, interview practice, and internship navigation.",
    tags: ["Career", "CV", "Interviews"],
    highlights: ["CV review", "Interview drills", "Portfolio guidance", "Internship roadmap"],
  },
};

export const FACULTIES: UniFaculty[] = [
  {
    slug: "bsc-computer-science",
    key: "bsc-compsci",
    name: "Computer Science",
    degree: "BSc",
    summary: "Software engineering foundations, systems thinking, and practical computing skills.",
    departments: ["student-hub", "teacher-office", "tutor-center", "library", "classrooms", "research-lab", "career-services"],
    focusAreas: ["Programming", "Algorithms", "Databases", "Web", "AI Foundations", "Systems"],
    featuredBooks: [
      { title: "Introduction to Algorithms", author: "Cormen et al.", year: "2009" },
      { title: "Clean Code", author: "Robert C. Martin", year: "2008" },
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", year: "2017" },
    ],
  },
  {
    slug: "ba-business-administration",
    key: "ba-business",
    name: "Business Administration",
    degree: "BA",
    summary: "Professional business education: management, strategy, operations, and finance literacy.",
    departments: ["student-hub", "teacher-office", "tutor-center", "library", "classrooms", "career-services"],
    focusAreas: ["Strategy", "Management", "Operations", "Finance Basics", "Leadership"],
    featuredBooks: [
      { title: "Good Strategy Bad Strategy", author: "Richard Rumelt", year: "2011" },
      { title: "The Lean Startup", author: "Eric Ries", year: "2011" },
      { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", year: "2011" },
    ],
  },
  {
    slug: "beng-engineering",
    key: "beng",
    name: "Engineering",
    degree: "BEng",
    summary: "Engineering fundamentals with practical problem solving and applied design systems.",
    departments: ["student-hub", "teacher-office", "tutor-center", "library", "classrooms", "research-lab", "career-services"],
    focusAreas: ["Mathematics", "Mechanics", "Design", "Systems", "Project Work"],
    featuredBooks: [
      { title: "Engineering Mechanics", author: "J.L. Meriam", year: "2012" },
      { title: "The Design of Everyday Things", author: "Don Norman", year: "2013" },
      { title: "Project Management", author: "Harold Kerzner", year: "2017" },
    ],
  },
  {
    slug: "llb-law",
    key: "llb",
    name: "Law",
    degree: "LLB",
    summary: "Legal reasoning, argumentation, and professional case analysis workflows.",
    departments: ["student-hub", "teacher-office", "tutor-center", "library", "classrooms", "career-services"],
    focusAreas: ["Legal Writing", "Case Analysis", "Ethics", "Research", "Argumentation"],
    featuredBooks: [
      { title: "Learning Legal Reasoning", author: "John Delaney", year: "2017" },
      { title: "Legal Writing in Plain English", author: "Bryan A. Garner", year: "2013" },
      { title: "The Rule of Law", author: "Tom Bingham", year: "2011" },
    ],
  },
];

export function getFaculty(slug: string) {
  return FACULTIES.find((f) => f.slug === slug) ?? null;
}

export function isDepartmentKey(x: string): x is UniDepartmentKey {
  return Object.prototype.hasOwnProperty.call(DEPARTMENTS, x);
}
