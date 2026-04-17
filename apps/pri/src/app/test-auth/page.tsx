"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function TestAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div style={{ padding: 40, color: "white", background: "#060e0a", minHeight: "100vh", fontFamily: "monospace" }}>
      <h1 style={{ color: "#34d399" }}>Auth Debug</h1>
      <pre style={{ marginTop: 20, color: "#6ee7b7", fontSize: 14 }}>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}
