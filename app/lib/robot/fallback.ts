import { CONTACT_EMAIL, SITE_NAME, SITE_SHORT_NAME, SUPPORT_EMAIL } from "@/lib/site";

export type ZentroLocalReply = {
  text: string;
  href?: string;
  label?: string;
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

/** Local answers when the AI backend is unavailable (no auth required). */
export function zentroLocalReply(input: string): string {
  return zentroLocalReplyRich(input).text;
}

export function zentroLocalReplyRich(input: string): ZentroLocalReply {
  const q = normalize(input);

  if (!q) {
    return {
      text: `Welcome. I'm the ${SITE_SHORT_NAME} operations assistant. Ask about incident response, automations, runbooks, pricing, or onboarding.`,
    };
  }

  if (
    hasAny(q, ["hello", "hi", "hey", "good morning", "good afternoon", "sup", "howdy"]) ||
    q === "yo"
  ) {
    return {
      text: `Hello. I'm ${SITE_NAME}, your IT operations copilot. I can help with incidents, automations, runbooks, and platform navigation. What would you like to know?`,
    };
  }

  if (
    hasAny(q, [
      "what is zentro",
      "what does zentro",
      "about zentro",
      "zentro platform",
      "who are you",
      "what do you do",
    ]) ||
    q === "zentro"
  ) {
    return {
      text: `${SITE_SHORT_NAME} unifies AI reasoning and safe IT automations into one command center — built for teams that need speed, safety, and accountability.`,
      href: "/docs",
      label: "Platform overview",
    };
  }

  if (hasAny(q, ["incident", "triage", "copilot", "outage", "on-call", "pager", "sev1", "sev 1"])) {
    return {
      text: "Incident Copilot helps you triage faster with AI summaries, likely causes, and next safe steps — so on-call engineers spend less time gathering context and more time fixing.",
      href: "/docs",
      label: "Incident Copilot",
    };
  }

  if (hasAny(q, ["automation", "workflow", "approval", "rollback", "change"])) {
    return {
      text: "The Automation Engine turns repeated IT tasks into guarded workflows with approvals, logs, and rollback plans — so production changes stay controlled.",
      href: "/robot",
      label: "Automation Engine",
    };
  }

  if (hasAny(q, ["runbook", "sop", "playbook", "procedure"])) {
    return {
      text: "Runbook Intelligence makes your internal SOPs searchable and actionable — your team can find the right procedure and execute with confidence during incidents.",
      href: "/search",
      label: "Search runbooks",
    };
  }

  if (hasAny(q, ["devops", "sre", "platform eng", "infra", "kubernetes", "k8s", "terraform"])) {
    return {
      text: `${SITE_SHORT_NAME} fits DevOps and SRE workflows: triage alerts, suggest safe remediation steps, and log every automated action for audit. Start with Incident Copilot, then wire automations with approvals.`,
      href: "/docs",
      label: "DevOps guide",
    };
  }

  if (hasAny(q, ["cloud", "aws", "azure", "gcp", "multi-cloud"])) {
    return {
      text: "Whether you're on AWS, Azure, or GCP, Zentro helps standardize incident response and automation guardrails across clouds — one copilot, consistent audit trail.",
    };
  }

  if (hasAny(q, ["cyber", "security ops", "soc", "threat", "vulnerability", "cve"])) {
    return {
      text: "For security operations, Zentro prioritizes safe, auditable actions — summarize findings, propose next steps, and require approval before high-impact changes.",
      href: "/docs",
      label: "Security workflows",
    };
  }

  if (hasAny(q, ["monitor", "alert", "observability", "datadog", "grafana", "prometheus"])) {
    return {
      text: "Connect your monitoring stack so the robot can reason over alert context, correlate signals, and suggest triage paths — reducing noise and mean time to resolve.",
    };
  }

  if (hasAny(q, ["price", "pricing", "plan", "plans", "cost", "subscription", "upgrade", "team size"])) {
    return {
      text: "We offer plans from solo operators to enterprise teams. Compare features and limits on the pricing page — tell me your team size if you want a recommendation.",
      href: "/pricing",
      label: "View pricing",
    };
  }

  if (hasAny(q, ["contact", "support", "email", "help", "reach", "talk to human", "sales"])) {
    return {
      text: `Reach us at ${CONTACT_EMAIL} for general questions or ${SUPPORT_EMAIL} for support. The contact page is fastest for structured requests.`,
      href: "/contact",
      label: "Contact page",
    };
  }

  if (hasAny(q, ["docs", "documentation", "guide", "how to start", "get started", "onboard"])) {
    return {
      text: "The Docs page maps modules, setup steps, and recommended first workflows. A good first win: connect read-only context, then try Incident Copilot on a past ticket.",
      href: "/docs",
      label: "Open docs",
    };
  }

  if (hasAny(q, ["robot", "assistant", "chat", "3d", "you"])) {
    return {
      text: "That's me! I'm the Zentro robot — ask me anything about IT operations, the platform, or where to go next. I wave hello and smile because I actually like helping.",
    };
  }

  if (hasAny(q, ["security", "audit", "compliance", "safe", "guardrail", "soc2", "iso"])) {
    return {
      text: `${SITE_SHORT_NAME} is built for audit-ready actions: approvals, immutable logs, and rollback plans before changes go live.`,
      href: "/privacy",
      label: "Privacy & trust",
    };
  }

  if (hasAny(q, ["demo", "trial", "try", "test", "pilot"])) {
    return {
      text: "You can explore the platform right here — ask me questions, browse modules, and review pricing. Full account sign-in is coming soon; no login needed to talk to me.",
      href: "/pricing",
      label: "See plans",
    };
  }

  if (hasAny(q, ["account", "sign in", "login", "sign up", "register", "auth"])) {
    return {
      text: "Account sign-in is coming soon. For now I answer everything right here — incidents, automations, pricing, docs — no login required.",
    };
  }

  if (hasAny(q, ["thank", "thanks", "awesome", "great job", "nice"])) {
    return {
      text: "You're welcome! Happy to help anytime. Ask another question or tell me what you're trying to solve in IT ops.",
    };
  }

  return {
    text: `I'm ${SITE_NAME}. I can help with incidents, automations, runbooks, cloud/DevOps workflows, pricing, and getting started. Try a specific question or visit /docs for the full map.`,
    href: "/docs",
    label: "Browse docs",
  };
}
