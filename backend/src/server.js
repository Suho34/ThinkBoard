import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRouter from "./routes/notesRoute.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// ✅ Load environment variables BEFORE doing anything else
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json()); //this middleware will parse the JSON request body
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
