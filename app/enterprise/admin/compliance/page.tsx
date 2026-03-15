import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Compliance Controls"
      intro="Coordinate governance readiness, policy structure, and operational controls for enterprise customers."
      focusTitle="Compliance Focus"
      focusItems=[{'        { title: "Policy Controls", desc: "Shape how rules and governance expectations appear in the workspace." },\n        { title: "Governance Readiness", desc: "Prepare the enterprise environment for stronger control standards." },\n        { title: "Operational Discipline", desc: "Support trustworthy enterprise operations through consistent structure." },\n        { title: "Customer Confidence", desc: "Present a stronger enterprise posture for adoption and scale." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review governance coverage", desc: "Check whether core admin and security controls are aligned." },\n        { title: "Prepare policy structure", desc: "Use compliance thinking to organize enterprise rules." },\n        { title: "Coordinate with security", desc: "Align compliance posture with access and audit decisions." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Admin Home", href: "/enterprise/admin" },\n        { label: "Security", href: "/enterprise/security" },\n        { label: "Audit", href: "/enterprise/admin/audit" }'}]
    />
  );
}
