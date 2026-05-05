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

  app.set("jwtSecret", jwtSecret);

  app.use(morgan("dev"));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.use(
    cors({
      origin: clientOrigin ? [clientOrigin] : true,
      credentials: true
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

