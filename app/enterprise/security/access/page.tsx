import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Access Control"
      intro="Define who can access what, across enterprise modules, operational tools, and sensitive areas."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Role Access", desc: "Match workspace roles to appropriate visibility and control." },
        { title: "Team Scope", desc: "Limit access by responsibility and organizational position." },
        { title: "Module Boundaries", desc: "Protect strategy, admin, and sensitive operational areas." },
        { title: "Governed Collaboration", desc: "Keep enterprise collaboration open, but controlled." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review role boundaries", desc: "Confirm each role has the right access range." },
        { title: "Check sensitive areas", desc: "Protect admin, strategy, and security functions." },
        { title: "Coordinate with team structure", desc: "Align permissions with enterprise org design." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Permissions", href: "/enterprise/admin/permissions" },
        { label: "Teams", href: "/enterprise/teams" }
      ]}
    />
  );
}
