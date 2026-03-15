import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Permissions"
      intro="Manage role rules, access levels, and module permissions so the workspace stays secure and usable."
      focusTitle="Permission Control Focus"
      focusItems=[{'        { title: "Role Rules", desc: "Define which roles can view, manage, or control enterprise features." },\n        { title: "Access Scope", desc: "Control team-level, room-level, and workspace-level access boundaries." },\n        { title: "Module Permissions", desc: "Limit access to sensitive enterprise modules when needed." },\n        { title: "Operational Safety", desc: "Reduce accidental changes and keep enterprise control disciplined." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review access gaps", desc: "Check for roles with too much or too little workspace access." },\n        { title: "Align roles to teams", desc: "Coordinate permissions with team structure and ownership." },\n        { title: "Protect sensitive modules", desc: "Apply tighter controls to strategy, security, and admin tools." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Admin Home", href: "/enterprise/admin" },\n        { label: "Security", href: "/enterprise/security" },\n        { label: "Teams", href: "/enterprise/teams" }'}]
    />
  );
}
