import { queryTags } from '@/lib/query';
import { NextResponse } from 'next/server';

export async function GET() {
  const tags = await queryTags()();
  return NextResponse.json(
    {
      tags,
    },
    { status: 200 }
  );
}
