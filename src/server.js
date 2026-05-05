import "dotenv/config";
import { createApp } from "./app.js";
import { connectDb } from "./db/connectDb.js";

const PORT = Number(process.env.PORT ?? 8080);
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

async function main() {
  await connectDb(MONGODB_URI, "lumen_trade");

  const app = createApp({
    clientOrigin: CLIENT_ORIGIN,
    jwtSecret: JWT_SECRET,
  });

  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});