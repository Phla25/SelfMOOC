import { NextResponse } from 'next/server';
import { pgPool, getMongoDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Ping PostgreSQL (Neon Serverless)
    const pgRes = await pgPool.query('SELECT 1 as alive');
    
    // 2. Ping MongoDB (Atlas)
    const mongoDb = await getMongoDb();
    await mongoDb.command({ ping: 1 });

    return NextResponse.json({
      status: 'healthy',
      service: 'SelfMOOC LMS',
      timestamp: new Date().toISOString(),
      database: {
        postgres: pgRes.rowCount ? 'online' : 'unreachable',
        mongodb: 'online',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'degraded',
        message: error?.message || 'Database ping error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
