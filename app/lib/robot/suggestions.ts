export type ZentroSuggestion = {
  label: string;
  prompt: string;
};

export const ZENTRO_QUICK_SUGGESTIONS: ZentroSuggestion[] = [
  { label: "What is Zentro?", prompt: "What is Zentro and who is it for?" },
  { label: "Incident triage", prompt: "How does Incident Copilot help during an outage?" },
  { label: "Safe automations", prompt: "How do approvals and rollback work for automations?" },
  { label: "Pricing", prompt: "What plans do you offer and how do I choose?" },
  { label: "Get started", prompt: "I'm new — what's the fastest way to get started?" },
  { label: "Security", prompt: "How does Zentro keep IT actions audit-ready?" },
];
