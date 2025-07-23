import { NextResponse } from "next/server"
import connectMongoDb from "../../../../../lib/mongodb"
import Post from "../../../../../models/post"

export const getPostId = async (req,{params}) => {
    const {id} = await params

    try {
        await connectMongoDb()
        const post = await Post.findById(id)
        return NextResponse.json(post,{status:200})
    } catch (error) {
        return NextResponse.json({status:500})
    }
}

export const deletePostId = async (req,{params}) => {
    const {id} = await params

    try {
        await connectMongoDb()
        await Post.findByIdAndDelete(id)
        return NextResponse.json({message:"post deleted successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"error deleting post"},{status:500})
    }

} 