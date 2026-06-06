import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

function resolveSupabaseUrl(): string {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in environment");
  }

  // Common misconfiguration: .supabase.com is invalid; host is always .supabase.co
  return url.replace(/\.supabase\.com\b/i, ".supabase.co").replace(/\/$/, "");
}

function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const supabaseUrl = resolveSupabaseUrl();
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseKey) {
      throw new Error("Missing SUPABASE_KEY in environment");
    }

    client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  return client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseAdmin(), prop, receiver);
  },
});
