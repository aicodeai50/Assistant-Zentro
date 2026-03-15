import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Profile"
      intro="Manage workspace identity basics like name, ownership, description, and operational state."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Workspace Name", desc: "Keep naming clear and aligned with enterprise identity." },
        { title: "Ownership", desc: "Clarify who leads and governs the workspace." },
        { title: "Operational State", desc: "Track whether the workspace is active, growing, or under review." },
        { title: "Identity Base", desc: "Use profile as the foundation for wider enterprise settings." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review workspace name", desc: "Confirm it matches your enterprise positioning." },
        { title: "Check operational state", desc: "Use profile settings to reflect readiness." },
        { title: "Align with identity", desc: "Coordinate profile with organization branding." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "Identity", href: "/enterprise/settings/identity" },
        { label: "Notifications", href: "/enterprise/settings/notifications" }
      ]}
    />
  );
}
