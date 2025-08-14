import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRouter from "./routes/notesRoute.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// ✅ Load environment variables BEFORE doing anything else
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); //this middleware will parse the JSON request body
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
