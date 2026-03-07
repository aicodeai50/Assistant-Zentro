export type TrackData = {
  key: string;
  title: string;
  subtitle: string;
  tags: string[];
};

export type FacultyData = {
  key: string;
  title: string;
  subtitle: string;
  areas: string[];
  redirectLabel: string;
  tracks: TrackData[];
};

export const FACULTIES: FacultyData[] = [
  {
    key: "it",
    title: "IT & Computer Science",
    subtitle: "Computing, software, systems, data, and security — built for serious learners.",
    areas: ["Algorithms", "Systems", "Mathematics", "Data", "Engineering"],
    redirectLabel: "Health Sciences",
    tracks: [
      {
        key: "computer-science",
        title: "Computer Science",
        subtitle: "Theory and practice of computation.",
        tags: ["Algorithms", "Programming", "Systems"],
      },
      {
        key: "information-technology",
        title: "Information Technology",
        subtitle: "Infrastructure, platforms, and technical operations.",
        tags: ["Networks", "Cloud", "Support"],
      },
      {
        key: "software-engineering",
        title: "Software Engineering",
        subtitle: "Designing and building reliable software systems.",
        tags: ["Architecture", "Testing", "DevOps"],
      },
      {
        key: "data-science",
        title: "Data Science",
        subtitle: "Analysis, statistics, and intelligent decision systems.",
        tags: ["Statistics", "ML", "Pipelines"],
      },
      {
        key: "artificial-intelligence",
        title: "Artificial Intelligence",
        subtitle: "Models, reasoning, and applied intelligent systems.",
        tags: ["LLMs", "Agents", "ML"],
      },
      {
        key: "cybersecurity",
        title: "Cybersecurity",
        subtitle: "Defense, secure systems, and threat awareness.",
        tags: ["Security", "Risk", "Threats"],
      },
      {
        key: "mathematics-for-computing",
        title: "Mathematics for Computing",
        subtitle: "Mathematical foundation for CS, AI, and engineering.",
        tags: ["Calculus", "Linear Algebra", "Discrete Math"],
      },
    ],
  },
  {
    key: "business",
    title: "Business & Management",
    subtitle: "Professional decision-making, markets, leadership, and execution.",
    areas: ["Strategy", "Markets", "Operations", "Leadership", "Analysis"],
    redirectLabel: "IT & Computer Science",
    tracks: [
      {
        key: "business-administration",
        title: "Business Administration",
        subtitle: "Core management systems, structure, and execution.",
        tags: ["Management", "Operations", "Planning"],
      },
      {
        key: "marketing",
        title: "Marketing",
        subtitle: "Positioning, messaging, audience growth, and campaigns.",
        tags: ["Brand", "Growth", "Campaigns"],
      },
      {
        key: "finance",
        title: "Finance",
        subtitle: "Capital, valuation, budgeting, and financial reasoning.",
        tags: ["Budgeting", "Valuation", "Analysis"],
      },
      {
        key: "entrepreneurship",
        title: "Entrepreneurship",
        subtitle: "Building ventures, testing ideas, and strategic execution.",
        tags: ["Startups", "Ideas", "Execution"],
      },
      {
        key: "human-resources",
        title: "Human Resources",
        subtitle: "People systems, hiring, performance, and workplace structure.",
        tags: ["Hiring", "People", "Performance"],
      },
      {
        key: "project-management",
        title: "Project Management",
        subtitle: "Planning, delivery, scope, timelines, and coordination.",
        tags: ["Scope", "Delivery", "Timeline"],
      },
    ],
  },
  {
    key: "law",
    title: "Law & Politics",
    subtitle: "Legal reasoning, governance, and public institutions.",
    areas: ["Law", "Policy", "Governance", "Ethics", "Institutions"],
    redirectLabel: "Business & Management",
    tracks: [
      {
        key: "constitutional-law",
        title: "Constitutional Law",
        subtitle: "Rights, state power, and constitutional structure.",
        tags: ["Rights", "State", "Constitution"],
      },
      {
        key: "criminal-law",
        title: "Criminal Law",
        subtitle: "Offences, liability, and criminal procedure.",
        tags: ["Offences", "Liability", "Procedure"],
      },
      {
        key: "international-relations",
        title: "International Relations",
        subtitle: "States, diplomacy, power, and global systems.",
        tags: ["Diplomacy", "States", "Power"],
      },
      {
        key: "public-policy",
        title: "Public Policy",
        subtitle: "Policy design, implementation, and institutional decision-making.",
        tags: ["Policy", "Implementation", "Institutions"],
      },
      {
        key: "political-theory",
        title: "Political Theory",
        subtitle: "Ideas, systems, justice, and governance logic.",
        tags: ["Justice", "Theory", "Governance"],
      },
      {
        key: "administrative-law",
        title: "Administrative Law",
        subtitle: "Public authority, decisions, and procedural fairness.",
        tags: ["Authority", "Procedure", "Fairness"],
      },
    ],
  },
  {
    key: "health",
    title: "Health Sciences",
    subtitle: "Clinical learning, patient-centered knowledge, and public health.",
    areas: ["Clinical", "Research", "Public Health", "Practice", "Ethics"],
    redirectLabel: "IT & Computer Science",
    tracks: [
      {
        key: "medicine",
        title: "Medicine",
        subtitle: "Core medical sciences, diagnosis, systems, and care.",
        tags: ["Diagnosis", "Systems", "Care"],
      },
      {
        key: "nursing",
        title: "Nursing",
        subtitle: "Patient care, monitoring, support, and professional practice.",
        tags: ["Care", "Practice", "Patients"],
      },
      {
        key: "public-health",
        title: "Public Health",
        subtitle: "Population health, prevention, systems, and epidemiology.",
        tags: ["Population", "Prevention", "Epidemiology"],
      },
      {
        key: "pharmacology",
        title: "Pharmacology",
        subtitle: "Drugs, mechanisms, dosing, and therapeutic action.",
        tags: ["Drugs", "Mechanisms", "Therapy"],
      },
      {
        key: "anatomy-physiology",
        title: "Anatomy & Physiology",
        subtitle: "Body structure, function, and systems understanding.",
        tags: ["Body", "Function", "Systems"],
      },
      {
        key: "medical-laboratory-science",
        title: "Medical Laboratory Science",
        subtitle: "Testing, diagnostics, lab systems, and interpretation.",
        tags: ["Diagnostics", "Testing", "Labs"],
      },
    ],
  },
  {
    key: "engineering",
    title: "Engineering",
    subtitle: "Design, mechanics, systems thinking, and practical engineering work.",
    areas: ["Design", "Systems", "Mechanics", "Electrics", "Materials"],
    redirectLabel: "IT & Computer Science",
    tracks: [
      {
        key: "mechanical-engineering",
        title: "Mechanical Engineering",
        subtitle: "Machines, motion, materials, and physical systems.",
        tags: ["Motion", "Machines", "Materials"],
      },
      {
        key: "electrical-engineering",
        title: "Electrical Engineering",
        subtitle: "Circuits, power, systems, and electrical design.",
        tags: ["Circuits", "Power", "Systems"],
      },
      {
        key: "civil-engineering",
        title: "Civil Engineering",
        subtitle: "Structures, infrastructure, and built environments.",
        tags: ["Structures", "Infrastructure", "Design"],
      },
      {
        key: "chemical-engineering",
        title: "Chemical Engineering",
        subtitle: "Processes, reactions, systems, and industrial transformation.",
        tags: ["Processes", "Reactions", "Industry"],
      },
      {
        key: "systems-engineering",
        title: "Systems Engineering",
        subtitle: "Complex systems, integration, and operational design.",
        tags: ["Systems", "Integration", "Operations"],
      },
      {
        key: "materials-engineering",
        title: "Materials Engineering",
        subtitle: "Properties, structures, and material performance.",
        tags: ["Materials", "Properties", "Performance"],
      },
    ],
  },
  {
    key: "education",
    title: "Education",
    subtitle: "Teaching science, pedagogy, assessment, and learning design.",
    areas: ["Pedagogy", "Assessment", "Classroom", "Learning Design", "Research"],
    redirectLabel: "Health Sciences",
    tracks: [
      {
        key: "curriculum-studies",
        title: "Curriculum Studies",
        subtitle: "Curriculum design, planning, and educational structure.",
        tags: ["Curriculum", "Planning", "Design"],
      },
      {
        key: "educational-psychology",
        title: "Educational Psychology",
        subtitle: "Learning, cognition, motivation, and development in education.",
        tags: ["Learning", "Motivation", "Development"],
      },
      {
        key: "assessment-evaluation",
        title: "Assessment & Evaluation",
        subtitle: "Testing, feedback, grading, and learning measurement.",
        tags: ["Assessment", "Testing", "Feedback"],
      },
      {
        key: "classroom-management",
        title: "Classroom Management",
        subtitle: "Behavior, environment, routines, and effective teaching structure.",
        tags: ["Behavior", "Routines", "Environment"],
      },
      {
        key: "teacher-education",
        title: "Teacher Education",
        subtitle: "Professional formation, methods, and reflective practice.",
        tags: ["Teaching", "Methods", "Practice"],
      },
      {
        key: "learning-design",
        title: "Learning Design",
        subtitle: "Designing educational experiences, content, and learning flow.",
        tags: ["Design", "Content", "Flow"],
      },
    ],
  },
  {
    key: "arts",
    title: "Creative Arts",
    subtitle: "Craft, media, design, and creative production with professional standards.",
    areas: ["Design", "Media", "Production", "Critique", "Portfolio"],
    redirectLabel: "Business & Management",
    tracks: [
      {
        key: "graphic-design",
        title: "Graphic Design",
        subtitle: "Visual systems, typography, layout, and brand communication.",
        tags: ["Visual", "Typography", "Brand"],
      },
      {
        key: "film-media",
        title: "Film & Media",
        subtitle: "Storytelling, production, editing, and screen communication.",
        tags: ["Story", "Editing", "Production"],
      },
      {
        key: "music",
        title: "Music",
        subtitle: "Theory, composition, performance, and listening practice.",
        tags: ["Theory", "Composition", "Performance"],
      },
      {
        key: "fine-art",
        title: "Fine Art",
        subtitle: "Practice, concept, technique, and artistic development.",
        tags: ["Practice", "Concept", "Technique"],
      },
      {
        key: "fashion-design",
        title: "Fashion Design",
        subtitle: "Garment design, materials, aesthetics, and production flow.",
        tags: ["Garments", "Aesthetics", "Materials"],
      },
      {
        key: "creative-writing",
        title: "Creative Writing",
        subtitle: "Narrative, style, voice, and writing craft.",
        tags: ["Narrative", "Style", "Voice"],
      },
    ],
  },
  {
    key: "interdisciplinary",
    title: "Interdisciplinary Studies",
    subtitle: "Cross-disciplinary thinking for modern problems.",
    areas: ["Systems", "Human Behavior", "Reasoning", "Ethics", "Society"],
    redirectLabel: "University Hub",
    tracks: [
      {
        key: "cognitive-science",
        title: "Cognitive Science",
        subtitle: "Mind, thought, behavior, and intelligent systems.",
        tags: ["Mind", "Behavior", "Thinking"],
      },
      {
        key: "ethics-society",
        title: "Ethics & Society",
        subtitle: "Ethical reasoning, society, responsibility, and public questions.",
        tags: ["Ethics", "Society", "Responsibility"],
      },
      {
        key: "systems-thinking",
        title: "Systems Thinking",
        subtitle: "Connections, complexity, feedback, and decision structures.",
        tags: ["Systems", "Complexity", "Feedback"],
      },
      {
        key: "innovation-studies",
        title: "Innovation Studies",
        subtitle: "Change, invention, adoption, and strategic development.",
        tags: ["Innovation", "Change", "Strategy"],
      },
      {
        key: "human-computer-interaction",
        title: "Human-Computer Interaction",
        subtitle: "Interaction, usability, design, and user-centered systems.",
        tags: ["UX", "Usability", "Interaction"],
      },
      {
        key: "global-studies",
        title: "Global Studies",
        subtitle: "Global systems, culture, politics, and interconnected change.",
        tags: ["Global", "Culture", "Systems"],
      },
    ],
  },
];

export function getFaculty(key: string) {
  return FACULTIES.find((f) => f.key === key);
}

export function getTrack(facultyKey: string, trackKey: string) {
  const faculty = getFaculty(facultyKey);
  if (!faculty) return null;

  const track = faculty.tracks.find((t) => t.key === trackKey);
  if (!track) return null;

  return { faculty, track };
}
