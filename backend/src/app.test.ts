import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "./app.js";

const mockSingle = vi.fn();

vi.mock("./database/supabaseClient.js", () => ({
  getSupabaseClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          single: mockSingle,
        }),
      }),
    }),
  }),
}));

describe("GET /health", () => {
  it("returns health check response", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ healthCheck: "server running" });
  });
});

describe("GET /game/daily-word", () => {
  it("returns daily word successfully", async () => {
    mockSingle.mockResolvedValue({ data: { word: "maybe" }, error: null });
    const response = await request(app).get("/game/daily-word");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ word: "maybe" });
  });

  it("returns 500 when database error occurs", async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: "something went wrong" },
    });
    const response = await request(app).get("/game/daily-word");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Unable to retrieve daily word" });
  });
});
