import express from "express"
import type { Request, Response } from "express"

const app = express();

app.get("/health", (req: Request, res: Response) => {
  return res.json(
    { healthCheck: "server running" }
  )
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});