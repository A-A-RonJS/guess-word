import express from "express";
import type { Request, Response } from "express";
import { getSupabaseClient } from "./database/supabaseClient.js";
import { formattedDate } from "./utils/dateUtils.js";

process.loadEnvFile();

const app = express();

app.get("/health", (req: Request, res: Response) => {
  return res.json({ healthCheck: "server running" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

const supabaseClient = getSupabaseClient();

app.get("/game/daily-word", async (req: Request, res: Response) => {
  const todaysDate = formattedDate(new Date());

  const todaysWord = await supabaseClient
    .from("daily_words")
    .select("word")
    .eq("date", todaysDate)
    .single();

  if (todaysWord.error) {
    console.error("Failed to fetch daily word:", todaysWord.error);
    return res.status(500).json({ message: "Unable to retrieve daily word" });
  }
  return res.json({ word: todaysWord.data?.word });
});
