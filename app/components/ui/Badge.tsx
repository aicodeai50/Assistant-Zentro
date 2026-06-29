type BadgeVariant = "default" | "success" | "warning" | "info";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-white/12 bg-white/[0.05] text-white/75",
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
  warning: "border-amber-400/20 bg-amber-400/10 text-amber-100",
  info: "border-cyan-400/20 bg-cyan-400/10 text-cyan-100",
};

type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
