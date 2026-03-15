import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Protected Workflows"
      intro="Strengthen how enterprise workflows are structured, protected, and coordinated across teams and operations."
      focusTitle="Workflow Protection Focus"
      focusItems=[{'        { title: "Controlled Flow", desc: "Support enterprise execution with more disciplined workflow structure." },\n        { title: "Operational Safety", desc: "Reduce avoidable errors in important processes." },\n        { title: "Protected Coordination", desc: "Make team workflows clearer and more reliable." },\n        { title: "Execution Confidence", desc: "Help enterprise operations feel safer at scale." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review sensitive workflow areas", desc: "Check what should be more protected or governed." },\n        { title: "Align with automation", desc: "Coordinate workflow safety with enterprise automation defaults." },\n        { title: "Support access control", desc: "Keep workflow protection connected to permissions." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Security Home", href: "/enterprise/security" },\n        { label: "Automation Settings", href: "/enterprise/settings/automation" },\n        { label: "Missions", href: "/enterprise/missions" }'}]
    />
  );
}
