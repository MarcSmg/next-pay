import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const {email, password, firstName, lastName, phone, genre} = body;

        // check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        })

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        // create new user

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
              email,
              password: hashedPassword,
              firstName,
              lastName,
              phone,
              genre
            }
        })

        const {password: _, ...userWithoutPassword} = newUser;
        
        return NextResponse.json({ user: userWithoutPassword, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}