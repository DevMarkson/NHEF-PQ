import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || ""; 
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("nhef_questions_db"); // Your database name
    const collection = db.collection("questions"); // Your collection name
    const questions = await collection.find({}).toArray();
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
