import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { authRoutes } from "./routes/authRoutes.js";
import { cryptoRoutes } from "./routes/cryptoRoutes.js";
import { profileRoutes } from "./routes/profileRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

export function createApp({ clientOrigin, jwtSecret } = {}) {
  const app = express();

  app.set("trust proxy", 1);
  app.set("jwtSecret", jwtSecret);

  app.use(morgan("dev"));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  const allowedOrigins = clientOrigin
    ? clientOrigin.split(",").map((o) => o.trim().replace(/\/$/, ""))
    : [];

  if (!allowedOrigins.includes("http://localhost:5173")) {
    allowedOrigins.push("http://localhost:5173");
  }

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
    })
  );

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use(authRoutes);
  app.use(profileRoutes);
  app.use(cryptoRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

