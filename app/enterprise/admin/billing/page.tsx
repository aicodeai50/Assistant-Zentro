import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Billing"
      intro="Review plan state, usage posture, and readiness for enterprise-scale access and operations."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Plan Readiness", desc: "Understand current enterprise plan posture and growth direction." },
        { title: "Usage View", desc: "Track how workspace activity relates to platform usage." },
        { title: "Subscription Oversight", desc: "Keep billing visibility aligned with operational scale." },
        { title: "Expansion Planning", desc: "Use billing context to support team and module growth." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review current plan", desc: "Check if workspace scope matches enterprise usage needs." },
        { title: "Monitor growth", desc: "Prepare for more members, teams, and module usage." },
        { title: "Coordinate admin readiness", desc: "Align billing posture with organization expansion." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Admin Home", href: "/enterprise/admin" },
        { label: "Settings", href: "/enterprise/settings" },
        { label: "Analytics", href: "/enterprise/analytics" }
      ]}
    />
  );
}
