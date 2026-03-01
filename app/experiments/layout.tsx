import type { ReactNode } from "react";
import ExperimentFrame from "@/components/experiments/ExperimentFrame";

export default function ExperimentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ExperimentFrame wallpaper="/experiments/portal.jpg">
      {children}
    </ExperimentFrame>
  );
}