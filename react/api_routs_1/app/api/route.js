import { NextResponse } from 'next/server';
export async function POST(request) {
    data= await request.json()
    return NextResponse.json({success:true,data:"yes"})
}