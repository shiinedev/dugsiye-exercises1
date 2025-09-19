import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:{params:{genre:string}}){

        const {genre} = await params

    const movies = await prisma.movies.findMany({
        where:{
            genre,
        },
        include:{
            rating:true
        }
     });

    return NextResponse.json(movies,{status:200,statusText:"movies fetched successfully"})

}