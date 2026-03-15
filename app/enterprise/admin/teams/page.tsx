import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Team Management"
      intro="Create teams, define structure, assign leads, and align team design with the workspace operating model."
      focusTitle="Team Structure Focus"
      focusItems=[{'        { title: "Team Creation", desc: "Set up new teams and shape how they appear in the enterprise environment." },\n        { title: "Lead Assignment", desc: "Connect managers and leads with the right operational scope." },\n        { title: "Structure Review", desc: "Keep organizational structure clear, scalable, and easy to navigate." },\n        { title: "Cross-Team Clarity", desc: "Reduce confusion in ownership, execution, and reporting lines." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Create missing teams", desc: "Add missing departments and support organizational growth." },\n        { title: "Assign or update leads", desc: "Keep leadership ownership visible across the platform." },\n        { title: "Review org shape", desc: "Confirm that team structure matches enterprise execution needs." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Admin Home", href: "/enterprise/admin" },\n        { label: "Teams", href: "/enterprise/teams" },\n        { label: "Permissions", href: "/enterprise/admin/permissions" }'}]
    />
  );
}
