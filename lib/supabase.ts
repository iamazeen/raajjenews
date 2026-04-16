import { createClient } from "@supabase/supabase-js";

function readConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  return { url, key };
}

export function hasSupabaseConfig() {
  return Boolean(readConfig());
}

export function getSupabase() {
  const cfg = readConfig();
  if (!cfg) {
    return null;
  }
  return createClient(cfg.url, cfg.key);
}
