"use server";
import mongoose, { Connection } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env.local or Vercel settings.");
}

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const globalWithMongoose = global as typeof global & { mongoose?: CachedConnection };
const cached: CachedConnection = globalWithMongoose.mongoose || { conn: null, promise: null };

async function dbConnect(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {  // Adding `!` ensures TypeScript treats it as a string
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected successfully to:", MONGODB_URI?.split("@")[1]); // Log host only for privacy
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;
  return cached.conn;
}

export default dbConnect;