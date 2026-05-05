import mongoose from "mongoose";

let isConnected = false;

export async function connectDb(mongoUri, dbName) {
  if (!mongoUri) throw new Error("MONGODB_URI is required");
  if (!dbName) throw new Error("DB_NAME is required");

  if (isConnected) {
    return mongoose.connection;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(mongoUri, {
      dbName,
      serverSelectionTimeoutMS: 10000, // fail fast if cannot connect
    });

    isConnected = true;

    const { host, name } = mongoose.connection;
    console.log(`MongoDB connected: ${host} / ${name}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });

    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
}