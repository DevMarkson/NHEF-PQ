// src/app/api/questions/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';

export async function GET() {
  try {
    await dbConnect();
    const questions = await Question.find();
    return NextResponse.json(questions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
