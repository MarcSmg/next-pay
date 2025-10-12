import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
        return NextResponse.json(
            { error: 'Invalid ID format. Must be a number.' },
            { status: 400 } // Bad Request
        );
    }    try {
        const deletedUser = await db.user.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ success: true, user: deletedUser }, { status: 200 });
    } catch (error) {
        console.error('API Error deleting user:', error);
        return NextResponse.json({ error: "Internal Server Error: Could not delete user." }, { status: 500 });
    }  
}