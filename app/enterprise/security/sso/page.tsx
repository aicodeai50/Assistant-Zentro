import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="SSO"
      intro="Prepare centralized sign-in and secure workspace identity handling for enterprise adoption."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Central Identity", desc: "Support more secure workspace access through centralized sign-in direction." },
        { title: "Enterprise Access Readiness", desc: "Make the workspace more acceptable to larger organizations." },
        { title: "User Trust", desc: "Reduce friction while improving security posture." },
        { title: "Operational Simplicity", desc: "Keep sign-in flows more consistent for enterprise users." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Define identity approach", desc: "Clarify how enterprise access should be governed." },
        { title: "Align with permissions", desc: "Coordinate sign-in policy with role-based access control." },
        { title: "Prepare admin process", desc: "Make access review easier for workspace administrators." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Access Control", href: "/enterprise/security/access" },
        { label: "Admin Users", href: "/enterprise/admin/users" }
      ]}
    />
  );
}
