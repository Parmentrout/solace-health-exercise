import { NextRequest } from 'next/server';
import { getAdvocatesQuery } from '@/db/queries/advocates';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageNumber = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 100;
    const offset = (pageNumber - 1) * limit || 0;

    const like = (searchParams.get('like') || '').trim().toLowerCase();
    const results = await getAdvocatesQuery(limit, offset, like);
    return Response.json({ results });
  } catch (error) {
    console.error(`GET /api/advocates failed from ${req.referrer}`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch advocate records',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
