import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Compliance"
      intro="Strengthen enterprise trust by shaping the workspace around policy, governance, and preparation."
      focusTitle="Compliance Focus"
      focusItems=[{'        { title: "Governance Structure", desc: "Support a more controlled enterprise environment." },\n        { title: "Policy Alignment", desc: "Bring rules, operations, and safety expectations together." },\n        { title: "Readiness Signals", desc: "Make the workspace look more enterprise-ready to teams and customers." },\n        { title: "Trust Building", desc: "Use compliance posture to support adoption confidence." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review governance posture", desc: "Check whether controls are visible and coherent." },\n        { title: "Coordinate with audit", desc: "Use traceability to support enterprise discipline." },\n        { title: "Prepare safer defaults", desc: "Align settings, permissions, and workflows." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Security Home", href: "/enterprise/security" },\n        { label: "Audit", href: "/enterprise/security/audit" },\n        { label: "Policy-Aware AI", href: "/enterprise/security/ai-policy" }'}]
    />
  );
}
