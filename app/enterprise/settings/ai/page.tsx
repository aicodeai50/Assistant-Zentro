import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="AI"
      intro="Adjust assistance behavior, enterprise reasoning style, and how AI supports users inside the workspace."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "AI Behavior", desc: "Shape how assistance should feel across enterprise interactions." },
        { title: "Reasoning Style", desc: "Support more structured decision assistance where needed." },
        { title: "Operational Role", desc: "Clarify what AI should support in the enterprise environment." },
        { title: "Trust and Guidance", desc: "Make AI feel more aligned with user expectations." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review AI support style", desc: "Decide how AI should help users day to day." },
        { title: "Coordinate with policy", desc: "Align AI settings with enterprise safety direction." },
        { title: "Connect AI to workflows", desc: "Support missions, settings, and OS Core behavior." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "AI Guidance", href: "/enterprise/help/ai-guidance" },
        { label: "Policy-Aware AI", href: "/enterprise/security/ai-policy" }
      ]}
    />
  );
}
