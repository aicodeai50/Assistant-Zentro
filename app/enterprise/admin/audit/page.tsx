import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Audit Visibility"
      intro="Track meaningful enterprise actions and maintain visibility into administrative and operational changes."
      focusTitle="Audit Focus"
      focusItems=[{'        { title: "Activity Logs", desc: "Review key workspace actions and changes across enterprise modules." },\n        { title: "Recent Changes", desc: "Understand what changed recently and where operational movement happened." },\n        { title: "Governance Review", desc: "Support accountability with clear traceability." },\n        { title: "Control Confidence", desc: "Make enterprise administration easier to trust and verify." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review recent admin actions", desc: "Check latest changes in permissions, users, and controls." },\n        { title: "Inspect governance flow", desc: "Confirm that changes are visible and auditable." },\n        { title: "Prepare compliance review", desc: "Use audit visibility to support enterprise readiness." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Admin Home", href: "/enterprise/admin" },\n        { label: "Security Audit", href: "/enterprise/security/audit" },\n        { label: "Compliance", href: "/enterprise/admin/compliance" }'}]
    />
  );
}
