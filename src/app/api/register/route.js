import connectMongoDb from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { name,email, password } = await req.json();

    try {
        await connectMongoDb()
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword
        };

        await User.create(user);
        return NextResponse.json({message:"user created successfully"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "User registration failed" }, { status: 500 });
    }
}

export const GET = async (req) => {
    const url = new URL(req.url)
    const name =  url.searchParams.get("name")
    

    try {
        await connectMongoDb()

        const user = await User.find(name? {name}: {})
        return NextResponse.json(user,{status:200})

    } catch (error) {
                return NextResponse.json({status:500})
    }
}