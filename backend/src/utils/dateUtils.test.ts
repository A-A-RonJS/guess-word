import { describe, it, expect } from "vitest";
import { formattedDate } from "./dateUtils.js";

describe("formattedDate", () => {
  it("formats date to YYYY-MM-DD", () => {
    const date = new Date("January 1, 2026");
    const result = formattedDate(date);
    console.log(`Formatted date: ${result}`);
    expect(result).toBe("2026-01-01");
  });

  it("formats double digit day and month to YYYY-MM-DD", () => {
    const date = new Date("November 11, 2026");
    const result = formattedDate(date);
    console.log(`Formatted date: ${result}`);
    expect(result).toBe("2026-11-11");
  });
});
