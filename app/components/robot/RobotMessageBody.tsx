import Link from "next/link";

const PATH_RE = /(\/(?:pricing|docs|contact|robot|search|privacy|terms)[^\s]*)/gi;

function splitLinks(text: string) {
  const parts: Array<{ type: "text" | "link"; value: string }> = [];
  let last = 0;
  let match: RegExpExecArray | null;

  const re = new RegExp(PATH_RE.source, "gi");
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: "text", value: text.slice(last, match.index) });
    }
    parts.push({ type: "link", value: match[0] });
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push({ type: "text", value: text.slice(last) });
  }

  return parts.length ? parts : [{ type: "text" as const, value: text }];
}

export default function RobotMessageBody({ text }: { text: string }) {
  const parts = splitLinks(text);

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        part.type === "link" ? (
          <Link
            key={`${part.value}-${i}`}
            href={part.value.split(/[,.)\]]/)[0] || part.value}
            className="font-medium text-cyan-200 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-100"
          >
            {part.value}
          </Link>
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </span>
  );
}
