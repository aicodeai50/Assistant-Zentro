import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Profile"
      intro="Manage workspace identity basics like name, ownership, description, and operational state."
      focusTitle="Profile Focus"
      focusItems=[{'        { title: "Workspace Name", desc: "Keep naming clear and aligned with enterprise identity." },\n        { title: "Ownership", desc: "Clarify who leads and governs the workspace." },\n        { title: "Operational State", desc: "Track whether the workspace is active, growing, or under review." },\n        { title: "Identity Base", desc: "Use profile as the foundation for wider enterprise settings." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review workspace name", desc: "Confirm it matches your enterprise positioning." },\n        { title: "Check operational state", desc: "Use profile settings to reflect readiness." },\n        { title: "Align with identity", desc: "Coordinate profile with organization branding." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Settings Home", href: "/enterprise/settings" },\n        { label: "Identity", href: "/enterprise/settings/identity" },\n        { label: "Notifications", href: "/enterprise/settings/notifications" }'}]
    />
  );
}
