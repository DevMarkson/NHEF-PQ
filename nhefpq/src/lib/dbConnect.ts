"use server";
import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
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
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;
  return cached.conn;
}

export default dbConnect;
