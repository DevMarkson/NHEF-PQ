import { NextResponse } from "next/server";
import { FilterQuery } from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Extract query parameters (e.g., ?type=verbal or ?metadata=true)
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const metadata = searchParams.get("metadata");
    const sectionName = searchParams.get("section");

    if (metadata === "true") {
      const sections = await Question.distinct("testSection");
      return NextResponse.json(sections);
    }

    // Define query filter
    let query: FilterQuery<unknown> = {};
    if (sectionName) {
      query = { testSection: sectionName };
    } else if (type === "verbal") {
      query = { testSection: { $regex: /verbal/i } };
    } else if (type === "abstract") {
      query = { testSection: { $regex: /abstract/i } };
    } else if (type === "numerical") {
      query = { testSection: { $regex: /numerical/i } };
    }

    const questions = await Question.find(query).lean();
    console.log(`Fetched ${questions.length} questions for query:`, query);

    return NextResponse.json(questions);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching questions:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch questions.",
        details: errorMessage,
        hint: "Verify MONGODB_URI in Vercel Environment Variables and check MongoDB Atlas IP Whitelist (0.0.0.0/0)."
      },
      { status: 500 }
    );
  }
}
