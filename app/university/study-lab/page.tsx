import Link from "next/link";

export default function StudyLabPage() {
  return (
    <div style={{ padding: 40, color: "white", background: "black", minHeight: "100vh" }}>
      <h1>Study Lab</h1>
      <p>This is the Study Lab environment.</p>

      <div style={{ marginTop: 20 }}>
        <Link href="/university">← Back to University Hub</Link>
      </div>
    </div>
  );
}
