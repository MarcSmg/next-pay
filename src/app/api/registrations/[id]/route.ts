import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const deletedUser = await db.user.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ success: true, user: deletedUser }, { status: 200 });
    } catch (error) {
        console.error('API Error deleting user:', error);
        return NextResponse.json({ error: "Internal Server Error: Could not delete user." }, { status: 500 });
    }  
}