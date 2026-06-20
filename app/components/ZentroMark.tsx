/** Zentro brand mark — geometric Z with operations ring */
export default function ZentroMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id="zentro-mark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" stroke="url(#zentro-mark-grad)" strokeWidth="2" opacity="0.35" />
      <path
        d="M28 32h44L36 50h36L28 68h44"
        stroke="url(#zentro-mark-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="4" fill="#67e8f9" />
    </svg>
  );
}
