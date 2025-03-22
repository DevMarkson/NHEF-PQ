// src/app/api/questions/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';

export async function GET() {
  try {
    await dbConnect();
    const questions = await Question.find();
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.error();
  }
}