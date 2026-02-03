import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
// Configure rate limiter: 3 requests per hour
const rateLimiter = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    analytics: true,
    prefix: '@upstash/ratelimit',
});

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api/send')){
        const forwardedFor = req.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
        const { success, limit, remaining, reset} = await rateLimiter.limit(ip);
        if (!success){
            return NextResponse.json(
                { 
                    error: 'Too many emails were sent, try again later',
                    message: 'Rate limit exceeded',
                },
                { 
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': remaining.toString(),
                        'X-RateLimit-Reset': reset.toString(),
                    }
                }
            );
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher : ['/api/:path*']
}