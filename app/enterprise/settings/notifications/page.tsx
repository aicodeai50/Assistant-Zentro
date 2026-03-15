import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Notifications"
      intro="Control how the workspace communicates alerts, updates, reminders, and important signals."
      focusTitle="Notification Focus"
      focusItems=[{'        { title: "Alerts", desc: "Surface meaningful enterprise activity without creating noise." },\n        { title: "Updates", desc: "Keep teams informed about changes and movement." },\n        { title: "Reminders", desc: "Support follow-through on schedules, missions, and tasks." },\n        { title: "Communication Rhythm", desc: "Make enterprise communication feel more consistent." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review alert priorities", desc: "Decide what should be emphasized across the workspace." },\n        { title: "Reduce notification overload", desc: "Balance visibility with user attention." },\n        { title: "Align with operations", desc: "Support meetings, missions, and admin actions." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Settings Home", href: "/enterprise/settings" },\n        { label: "Schedule", href: "/enterprise/schedule" },\n        { label: "Help", href: "/enterprise/help" }'}]
    />
  );
}
