export type ZentroSuggestion = {
  label: string;
  prompt: string;
};

export const ZENTRO_QUICK_SUGGESTIONS: ZentroSuggestion[] = [
  { label: "Platform overview", prompt: "Give me a concise overview of the Zentro platform." },
  { label: "Incident response", prompt: "How does Incident Copilot support on-call engineers during an outage?" },
  { label: "Automation safety", prompt: "Explain approval gates and rollback for IT automations." },
  { label: "Enterprise pricing", prompt: "What plans are available and how should a team choose?" },
  { label: "Onboarding", prompt: "What is the recommended path to get started with Zentro?" },
  { label: "Compliance", prompt: "How does Zentro support audit-ready, compliance-friendly operations?" },
];
