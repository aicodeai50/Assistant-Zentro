import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Audit"
      intro="Keep enterprise activity visible and easier to review for safety, accountability, and governance."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Traceability", desc: "Follow enterprise changes across modules and access controls." },
        { title: "Activity Review", desc: "Observe meaningful user and admin actions." },
        { title: "Governance Visibility", desc: "Support enterprise trust through reviewable actions." },
        { title: "Operational Confidence", desc: "Make the workspace feel safer and more controlled." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review recent activity", desc: "Look for meaningful admin and security changes." },
        { title: "Check risky areas", desc: "Watch sensitive actions around permissions and structure." },
        { title: "Support governance review", desc: "Use audit signals to improve enterprise confidence." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Admin Audit", href: "/enterprise/admin/audit" },
        { label: "Compliance", href: "/enterprise/security/compliance" }
      ]}
    />
  );
}
