import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Billing"
      intro="Review plan state, usage posture, and readiness for enterprise-scale access and operations."
      focusTitle="Billing Focus"
      focusItems=[{'        { title: "Plan Readiness", desc: "Understand current enterprise plan posture and growth direction." },\n        { title: "Usage View", desc: "Track how workspace activity relates to platform usage." },\n        { title: "Subscription Oversight", desc: "Keep billing visibility aligned with operational scale." },\n        { title: "Expansion Planning", desc: "Use billing context to support team and module growth." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review current plan", desc: "Check if workspace scope matches enterprise usage needs." },\n        { title: "Monitor growth", desc: "Prepare for more members, teams, and module usage." },\n        { title: "Coordinate admin readiness", desc: "Align billing posture with organization expansion." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Admin Home", href: "/enterprise/admin" },\n        { label: "Settings", href: "/enterprise/settings" },\n        { label: "Analytics", href: "/enterprise/analytics" }'}]
    />
  );
}
