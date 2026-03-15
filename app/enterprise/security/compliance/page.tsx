import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Compliance"
      intro="Strengthen enterprise trust by shaping the workspace around policy, governance, and preparation."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Governance Structure", desc: "Support a more controlled enterprise environment." },
        { title: "Policy Alignment", desc: "Bring rules, operations, and safety expectations together." },
        { title: "Readiness Signals", desc: "Make the workspace look more enterprise-ready to teams and customers." },
        { title: "Trust Building", desc: "Use compliance posture to support adoption confidence." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review governance posture", desc: "Check whether controls are visible and coherent." },
        { title: "Coordinate with audit", desc: "Use traceability to support enterprise discipline." },
        { title: "Prepare safer defaults", desc: "Align settings, permissions, and workflows." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Audit", href: "/enterprise/security/audit" },
        { label: "Policy-Aware AI", href: "/enterprise/security/ai-policy" }
      ]}
    />
  );
}
