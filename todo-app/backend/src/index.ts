import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todosRouter from "./routes/todos";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todosRouter);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`🚀 Todo API server running at http://localhost:${PORT}`);
});
