// src/app/api/bugs/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Bug from '@/models/Bug';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const { status, reply } = await request.json();

    const updatedBug = await Bug.findByIdAndUpdate(
      id,
      { status, reply },
      { new: true }
    );

    if (!updatedBug) {
      return NextResponse.json({ error: 'Bug not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBug);
  } catch {
    return NextResponse.json({ error: 'Failed to update bug' }, { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const deletedBug = await Bug.findByIdAndDelete(id);

    if (!deletedBug) {
      return NextResponse.json({ error: 'Bug not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bug deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete bug' }, { status: 500 });
  }
}
