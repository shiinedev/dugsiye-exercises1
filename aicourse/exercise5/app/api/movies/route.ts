import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){


    const {searchParams} = new URL(req.url);

    const genre:string = searchParams.get("g") ?? "";

    if(genre.trim()){
        
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

    const movies = await prisma.movies.findMany({
        include:{
            rating:true
        }
    });

    return NextResponse.json(movies,{status:200,statusText:"movies fetched successfully"})

}


export async function POST(req:NextRequest) {

    const body = await req.json();

    try {
        const movie = await prisma.movies.create({
            data:{
                title:body?.title,
                description:body?.description,
                director:body?.director,
                genre:body?.genre,
                year:body?.year,  
            }
        });

        return NextResponse.json({movie},{status:201,statusText:"movie created successfully"})
    } catch (error) {
        return NextResponse.json({error},{status:500,statusText:"error creating movie"})
    }
    
}