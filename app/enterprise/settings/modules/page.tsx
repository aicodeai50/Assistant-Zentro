import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Modules"
      intro="Control which enterprise modules are emphasized and how the workspace is organized around them."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Module Visibility", desc: "Decide which areas matter most in the enterprise environment." },
        { title: "Workspace Structure", desc: "Support a cleaner experience by shaping visible priorities." },
        { title: "Operational Relevance", desc: "Keep important modules prominent for users." },
        { title: "Enterprise Simplicity", desc: "Reduce clutter and improve navigation confidence." }
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review visible modules", desc: "Check whether the workspace reflects current priorities." },
        { title: "Align with user needs", desc: "Support clearer navigation and adoption." },
        { title: "Coordinate with settings", desc: "Keep module emphasis aligned with identity and automation." }
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "Automation", href: "/enterprise/settings/automation" },
        { label: "Overview", href: "/enterprise" }
      ]}
    />
  );
}
