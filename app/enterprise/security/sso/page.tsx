import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="SSO"
      intro="Prepare centralized sign-in and secure workspace identity handling for enterprise adoption."
      focusTitle="SSO Focus"
      focusItems=[{'        { title: "Central Identity", desc: "Support more secure workspace access through centralized sign-in direction." },\n        { title: "Enterprise Access Readiness", desc: "Make the workspace more acceptable to larger organizations." },\n        { title: "User Trust", desc: "Reduce friction while improving security posture." },\n        { title: "Operational Simplicity", desc: "Keep sign-in flows more consistent for enterprise users." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Define identity approach", desc: "Clarify how enterprise access should be governed." },\n        { title: "Align with permissions", desc: "Coordinate sign-in policy with role-based access control." },\n        { title: "Prepare admin process", desc: "Make access review easier for workspace administrators." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Security Home", href: "/enterprise/security" },\n        { label: "Access Control", href: "/enterprise/security/access" },\n        { label: "Admin Users", href: "/enterprise/admin/users" }'}]
    />
  );
}
