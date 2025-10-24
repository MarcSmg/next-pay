import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { FedaPay, Transaction } from "fedapay";

export async function POST(req: Request) {
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

        // Create transaction

        FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY as string);
        FedaPay.setEnvironment('sandbox');

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        
        const transaction = await Transaction.create({
            description: 'Event Registration Fee',
            amount: 500, // Fixed amount
            currency: { iso: 'XOF' },
            customer: {
                firstname: firstName,
                lastname: lastName,
                email: email,
                phone_number: {
                    number: phone,
                    country: 'BJ' // <-- Set your country code (e.g., 'BJ', 'SN', 'CI')
                }
            },
            callback_url: `${siteUrl}/registration-success`,
        });
        
        const token = await transaction.generateToken();

        const {password: _, ...userWithoutPassword} = newUser;
        
        return NextResponse.json({ url: token.url, message: "User registered successfully" }, { status: 200 });
    } catch (error) {
        console.error("API Error: ", error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}