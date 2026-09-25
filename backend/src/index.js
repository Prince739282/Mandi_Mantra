import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mandiRoutes from "./routes/mandi.routes.js";

dotenv.config({
  path: "./.env",
});
console.log("API key loaded:", !!process.env.GOV_API_KEY);

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/v1/mandi", mandiRoutes);

app.get("/", (req, res) => {
  res.send("MandiMantra Backend is running");
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});

console.log("Welcome to MandiMantra");
