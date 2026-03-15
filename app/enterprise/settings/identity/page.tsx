import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Identity"
      intro="Shape how the workspace is presented through brand direction, logo logic, and enterprise identity."
      focusTitle="Identity Focus"
      focusItems=[{'        { title: "Brand Direction", desc: "Define how the enterprise workspace should feel and be recognized." },\n        { title: "Visual Identity", desc: "Support a stronger workspace presence through clearer identity cues." },\n        { title: "Environment Consistency", desc: "Keep identity aligned across modules and enterprise sections." },\n        { title: "Trust Signaling", desc: "Make the workspace feel more mature and intentional." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review brand posture", desc: "Confirm how the workspace should present itself." },\n        { title: "Coordinate with profile", desc: "Align identity with workspace naming and structure." },\n        { title: "Support user recognition", desc: "Use identity to reduce confusion and strengthen trust." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Settings Home", href: "/enterprise/settings" },\n        { label: "Profile", href: "/enterprise/settings/profile" },\n        { label: "Help", href: "/enterprise/help" }'}]
    />
  );
}
