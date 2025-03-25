import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

export async function GET(req: Request) {
  try {
    await client.connect();
    const db = client.db("nhef_questions_db"); // Database name
    const collection = db.collection("questions"); // Collection name

    // Extract query parameters (e.g., ?type=numerical)
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // Get type of question

    // Define query filter
    let query = {};
    if (type === "verbal") {
      query = { testSection: { $regex: /verbal/i } }; // Matches "Verbal Reasoning Test"
    } else if (type === "abstract") {
      query = { testSection: { $regex: /abstract/i } }; // Matches "Abstract Reasoning Test"
    } else if (type === "numerical") {
      query = { testSection: { $regex: /numerical/i } }; // Matches "Numerical Reasoning Test"
    }

    const questions = await collection.find(query).toArray();

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
