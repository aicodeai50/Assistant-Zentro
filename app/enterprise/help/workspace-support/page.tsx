import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Help"
      eyebrow="Help & Support"
      title="Workspace Support"
      intro="Help users understand navigation, structure, and the operating logic of Shynvo Enterprise."
      focusTitle="Support Focus"
      focusItems=[{'        { title: "Navigation Guidance", desc: "Clarify how users move across modules and enterprise sections." },\n        { title: "Structure Support", desc: "Explain how workspace areas relate to each other." },\n        { title: "Usage Understanding", desc: "Reduce confusion about how the product is meant to be used." },\n        { title: "Operational Flow", desc: "Support smoother movement between overview, control, and execution." }'}]
      actionTitle="Recommended Actions"
      actionItems=[{'        { title: "Review navigation flow", desc: "Confirm that users can find key enterprise areas." },\n        { title: "Link support with onboarding", desc: "Use getting-started guidance to reduce confusion." },\n        { title: "Support deeper adoption", desc: "Guide users into settings, missions, and teams." }'}]
      relatedTitle="Related Areas"
      relatedLinks=[{'        { label: "Help Home", href: "/enterprise/help" },\n        { label: "Getting Started", href: "/enterprise/help/getting-started" },\n        { label: "Overview", href: "/enterprise" }'}]
    />
  );
}
