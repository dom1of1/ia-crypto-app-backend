import { HttpError } from "../lib/http.js";
import { ZodError } from "zod";

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request",
      details: err.issues
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
      details: err.details
    });
  }

  const status = err?.statusCode ?? err?.status ?? 500;
  const message = status >= 500 ? "Server error" : (err?.message ?? "Request failed");
  return res.status(status).json({ message });
}

