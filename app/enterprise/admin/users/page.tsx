import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="User Management"
      intro="Manage workspace membership, access state, invite flow, and participation visibility from one place."
      focusTitle="User Management Focus"
      focusItems=[{'        { title: "Member Directory", desc: "Review active members, invite status, and current workspace participation." },\n        { title: "Access Status", desc: "Track who has access, pending approval, or restricted workspace entry." },\n        { title: "Admin Oversight", desc: "Keep control over enterprise membership changes and access governance." },\n        { title: "Participation Health", desc: "Monitor whether users are engaged across teams, rooms, and missions." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Invite new members", desc: "Extend workspace access safely with role-aware onboarding." },\n        { title: "Review dormant accounts", desc: "Identify inactive or misaligned workspace access." },\n        { title: "Prepare role assignment", desc: "Coordinate roles with team and permission settings." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Admin Home", href: "/enterprise/admin" },\n        { label: "Permissions", href: "/enterprise/admin/permissions" },\n        { label: "Directory", href: "/enterprise/directory" }'}]
    />
  );
}
