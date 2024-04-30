'use server'

import List from '@/app/models/ListModels';
import connectDB from '@/app/lib/db';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const lists = await List.find();
        return new NextResponse(JSON.stringify(lists), { status: 200 });
    } catch (error) {
        return NextResponse.error("Failed to fetch lists", { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { id, activity } = await req.json();
        await List.create({ id, activity });
        return new NextResponse.json({ message: "List created" });
    } catch (error) {
        return NextResponse.error("Failed to create list", { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get("id");
        await List.findByIdAndDelete(id);
        return new NextResponse.json({ message: "List deleted" });
    } catch (error) {
        return NextResponse.error("Failed to delete list", { status: 500 });
    }
}
