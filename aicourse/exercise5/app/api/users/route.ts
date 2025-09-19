import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

      const { searchParams } = new URL(req.url);

      const op =  searchParams.get("op") ?? "gt"
      const age = searchParams.get("age")
        console.log("op",op);
        console.log("age",age);
        

    const users = await prisma.users.findMany({
        where:{age:{[op]:Number(age)}}
    });

    return NextResponse.json(users)
}


export async function POST(req:NextRequest){

    const body = await req.json();

    try {

        const user = await prisma.users.create({
            data:{
                age:body?.age,
                email:body.email,
                name:body?.name,
                favoriteGenre:body?.favoriteGenre,
            } 
        }) 

        return NextResponse.json({user},{status:201,statusText:"user created successfully"})
        
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }

}