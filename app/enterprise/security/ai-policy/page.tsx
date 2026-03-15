import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Policy-Aware AI"
      intro="Guide how AI operates inside the enterprise so support, automation, and reasoning stay aligned with rules."
      focusTitle="AI Policy Focus"
      focusItems=[{'        { title: "AI Boundaries", desc: "Define how AI should behave in enterprise workflows." },\n        { title: "Safe Assistance", desc: "Keep AI helpful without making enterprise operations feel risky." },\n        { title: "Operational Alignment", desc: "Match AI behavior to governance and enterprise needs." },\n        { title: "Trustworthy Guidance", desc: "Make AI easier for organizations to accept." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Set AI behavior norms", desc: "Clarify how AI should assist in enterprise workflows." },\n        { title: "Coordinate with settings", desc: "Align AI policy with workspace AI preferences." },\n        { title: "Protect sensitive workflows", desc: "Reduce AI overreach in controlled enterprise areas." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Security Home", href: "/enterprise/security" },\n        { label: "AI Settings", href: "/enterprise/settings/ai" },\n        { label: "Protected Workflows", href: "/enterprise/security/workflows" }'}]
    />
  );
}
