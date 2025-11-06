import connectMongoDb from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { name, email, password, street, city } = await req.json();

    try {
        await connectMongoDb()
        const hashedPassword = await bcrypt.hash(password, 10);
        
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
        }

        
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
        }

        
        const userObj = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            address: {}, 
            ...(city ? { city: city.trim() } : {})
        };
        
        
        if (street && street.trim()) {
            userObj.address = { street: street.trim() };
        }

        
        const existing = await User.findOne({ email })
        if (existing) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
        }

        const created = await User.create(userObj);
        
        return NextResponse.json({ message: "user created successfully", userId: created._id }, { status: 201 });
    } catch (error) {

        const isProd = process.env.NODE_ENV === 'production'
        const message = isProd ? 'User registration failed' : (error?.message || 'User registration failed')
        return NextResponse.json({ error: message }, { status: 500 });
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
                console.error('Register GET error:', error)
                return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
    }
}