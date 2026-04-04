// src/app/api/bugs/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Bug from '@/models/Bug';

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const showFixed = searchParams.get('showFixed') === 'true';
  const filter = showFixed ? {} : { status: { $ne: 'fixed' } };

  try {
    const bugs = await Bug.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(bugs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bugs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { description } = await request.json();
    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }
    const bug = await Bug.create({ description });
    return NextResponse.json(bug, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to report bug' }, { status: 500 });
  }
}
