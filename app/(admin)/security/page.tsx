export const dynamic = "force-dynamic";

async function getSecurityOverview() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backend) throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");

  const key = process.env.BACKEND_API_KEY || "";

  const res = await fetch(`${backend}/security/overview`, {
    method: "GET",
    headers: {
      "X-API-Key": key,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }

  return res.json();
}

export default async function SecurityDashboard() {
  const data = await getSecurityOverview();

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Security Dashboard</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Locked API Keys</h2>
        {!data.locked_keys || data.locked_keys.length === 0 ? (
          <p className="text-gray-500">No locked keys</p>
        ) : (
          <ul className="list-disc ml-6">
            {data.locked_keys.map((k: string) => (
              <li key={k} className="font-mono text-sm">
                {k}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">LLM Anomalies</h2>
        {!data.anomalies || data.anomalies.length === 0 ? (
          <p className="text-gray-500">No anomalies</p>
        ) : (
          <div className="space-y-3">
            {data.anomalies.map((a: any, i: number) => (
              <div key={i} className="border rounded-lg p-3 bg-gray-50">
                <div className="text-xs text-gray-600 font-mono">
                  {a.event} — {a.actor}
                </div>
                <div className="mt-1 text-sm space-y-1">
                  <div>
                    <b>Severity:</b> {a.metadata?.severity ?? "unknown"}
                  </div>
                  <div>
                    <b>Confidence:</b> {a.metadata?.confidence ?? "n/a"}
                  </div>
                  <div>
                    <b>Action:</b> {a.metadata?.recommended_action ?? "n/a"}
                  </div>
                  <div>
                    <b>Reason:</b> {a.metadata?.reason ?? "n/a"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Audit Tail</h2>
        <div className="max-h-96 overflow-auto border rounded-lg p-3 text-xs font-mono bg-white">
          {(data.audit_tail || []).map((e: any, i: number) => (
            <div key={i}>
              [{new Date((e.ts ?? 0) * 1000).toISOString()}] {e.event} —{" "}
              {e.actor}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Recent Usage</h2>
        <div className="max-h-64 overflow-auto border rounded-lg p-3 text-xs font-mono bg-white">
          {(data.usage || []).map((u: any, i: number) => (
            <div key={i}>
              [{new Date((u.timestamp ?? 0) * 1000).toISOString()}] {u.endpoint}{" "}
              — {u.api_key} — tokens:{u.tokens}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
