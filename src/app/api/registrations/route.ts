import { db } from '@/lib/db'; 
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const registrations = await db.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                genre: true,
                createdAt: true,
            }
        })
        console.log('API Successfully fetched users',registrations);
        return NextResponse.json(registrations, { status: 200 })
    } catch (error) {
        console.error('API Error fetching users:', error);

        return NextResponse.json({ error: "Internal Server Error: Could not retrieve users." }, { status: 500 });
    }
}

