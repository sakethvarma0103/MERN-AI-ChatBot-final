import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
config();
const app = express();
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/uploads/books", express.static(path.join(process.cwd(), "src/uploads/books")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
