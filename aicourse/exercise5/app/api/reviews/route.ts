
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){

    const ratings = await prisma.reviews.findMany({
        include:{
            movie:true
        }
    });


    return NextResponse.json({ratings},{status:200,statusText:"fetched ratings"})
}


export async function POST(req:NextRequest){

    const body = await req.json();

    try {

        const rating = await prisma.reviews.create({
            data:{
                comment:body?.comment,
                date:body?.date,
                movieId:body?.movieId,
                rating:body.rating
            },
            include:{
                movie:true
            }
        });

        return NextResponse.json({rating},{status:201,statusText:"created rating successfully"})
        
    } catch (error) {
        return NextResponse.json({error},{status:500,statusText:"error creating Post"})
        
    }

}