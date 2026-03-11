"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

type Props = {
  code: string;
  next: string;
};

export default function AuthCallbackClient({ code, next }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("Completing account verification...");

  useEffect(() => {
    let active = true;

    async function completeAuth() {
      const supabase = getSupabaseClient();

      if (!supabase) {
        if (active) setMessage("Supabase is not configured.");
        return;
      }

      if (!code) {
        if (active) setMessage("Missing verification code.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        if (active) setMessage(error.message);
        return;
      }

      router.replace(next || "/account");
    }

    completeAuth();

    return () => {
      active = false;
    };
  }, [code, next, router]);

  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm">
        <div className="text-sm text-white/85">{message}</div>
      </div>
    </section>
  );
}
