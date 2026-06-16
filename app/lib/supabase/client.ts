import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { hasSupabaseAuth } from "./env";

let supabaseInstance: SupabaseClient | null = null;

/** Returns a browser Supabase client, or null when auth env vars are not configured. */
export function getSupabaseClient(): SupabaseClient | null {
  if (!hasSupabaseAuth()) {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim();

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseInstance;
}
