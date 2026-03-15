import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Automation"
      intro="Shape baseline workflow behavior for routing, triggers, actions, and enterprise coordination."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Trigger Logic", desc: "Clarify which events should create action inside the workspace." },
        { title: "Flow Defaults", desc: "Set enterprise-wide behavior for automated movement and coordination." },
        { title: "Operational Consistency", desc: "Reduce friction by standardizing common workflow patterns." },
        { title: "Scalable Execution", desc: "Support larger enterprise behavior without manual repetition." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review trigger priorities", desc: "Decide what should activate automation." },
        { title: "Align with workflows", desc: "Support missions, schedules, and protected operations." },
        { title: "Coordinate with AI", desc: "Make automation safer and more useful." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "AI Settings", href: "/enterprise/settings/ai" },
        { label: "Protected Workflows", href: "/enterprise/security/workflows" }
      ]}
    />
  );
}
