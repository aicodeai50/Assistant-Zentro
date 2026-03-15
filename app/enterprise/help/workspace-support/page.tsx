import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Help"
      eyebrow="Help & Support"
      title="Workspace Support"
      intro="Help users understand navigation, structure, and the operating logic of Shynvo Enterprise."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Navigation Guidance", desc: "Clarify how users move across modules and enterprise sections." },
        { title: "Structure Support", desc: "Explain how workspace areas relate to each other." },
        { title: "Usage Understanding", desc: "Reduce confusion about how the product is meant to be used." },
        { title: "Operational Flow", desc: "Support smoother movement between overview, control, and execution." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review navigation flow", desc: "Confirm that users can find key enterprise areas." },
        { title: "Link support with onboarding", desc: "Use getting-started guidance to reduce confusion." },
        { title: "Support deeper adoption", desc: "Guide users into settings, missions, and teams." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Help Home", href: "/enterprise/help" },
        { label: "Getting Started", href: "/enterprise/help/getting-started" },
        { label: "Overview", href: "/enterprise" }
      ]}
    />
  );
}
