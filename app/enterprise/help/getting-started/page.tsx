import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Help"
      eyebrow="Help & Support"
      title="Getting Started"
      intro="Guide new enterprise users through workspace setup, team structure, and first-step configuration."
      focusTitle="Onboarding Focus"
      focusItems=[{'        { title: "Workspace Setup", desc: "Start with the right enterprise structure and visible operating areas." },\n        { title: "Team Readiness", desc: "Make teams easier to onboard into a shared environment." },\n        { title: "Module Familiarity", desc: "Help users understand what each enterprise area does." },\n        { title: "Adoption Confidence", desc: "Reduce friction during first use." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review workspace structure", desc: "Start with settings, teams, and permissions." },\n        { title: "Open help overview", desc: "Return to the support center for more guidance." },\n        { title: "Prepare first admin flow", desc: "Move into admin and settings for setup." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Help Home", href: "/enterprise/help" },\n        { label: "Settings", href: "/enterprise/settings" },\n        { label: "Admin", href: "/enterprise/admin" }'}]
    />
  );
}
