import { afterEach, describe, expect, it } from "vitest";
import { getSupabaseClient } from "./supabaseClient.js";

describe("placeholder text here", () => {
  afterEach(() => {
    process.env.SUPABASE_URL = "http://127.0.0.1:54321";
    process.env.SUPABASE_SECRET = "test-secret";
  });

  it("throws when SUPABASE_URL is not set", () => {
    delete process.env.SUPABASE_URL;
    expect(() => getSupabaseClient()).toThrow("SUPABASE_URL not set");
  });

  it("throws when SUPABASE_SECRET is not set", () => {
    delete process.env.SUPABASE_SECRET;
    expect(() => getSupabaseClient()).toThrow("SUPABASE_SECRET not set");
  });

  it("returns a supabase client when env vars are set", () => {
    const client = getSupabaseClient();
    expect(client).toBeDefined();
  });
});
