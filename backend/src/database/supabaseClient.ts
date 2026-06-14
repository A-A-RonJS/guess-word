import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types.js";

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET;
  if (!url) throw new Error("SUPABASE_URL not set");
  if (!key) throw new Error("SUPABASE_SECRET not set");
  return createClient<Database>(url, key);
}
