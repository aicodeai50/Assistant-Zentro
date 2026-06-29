import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
};

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, className = "", padding = "md" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function CardHeader({ eyebrow, title, description, action }: CardHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
