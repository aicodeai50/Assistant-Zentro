import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="AI"
      intro="Adjust assistance behavior, enterprise reasoning style, and how AI supports users inside the workspace."
      focusTitle="AI Settings Focus"
      focusItems=[{'        { title: "AI Behavior", desc: "Shape how assistance should feel across enterprise interactions." },\n        { title: "Reasoning Style", desc: "Support more structured decision assistance where needed." },\n        { title: "Operational Role", desc: "Clarify what AI should support in the enterprise environment." },\n        { title: "Trust and Guidance", desc: "Make AI feel more aligned with user expectations." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review AI support style", desc: "Decide how AI should help users day to day." },\n        { title: "Coordinate with policy", desc: "Align AI settings with enterprise safety direction." },\n        { title: "Connect AI to workflows", desc: "Support missions, settings, and OS Core behavior." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Settings Home", href: "/enterprise/settings" },\n        { label: "AI Guidance", href: "/enterprise/help/ai-guidance" },\n        { label: "Policy-Aware AI", href: "/enterprise/security/ai-policy" }'}]
    />
  );
}
