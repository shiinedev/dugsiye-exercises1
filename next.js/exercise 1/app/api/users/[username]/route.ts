import { NextRequest, NextResponse } from "next/server"

interface usernameProps{
    params:{
        username:string
    }
}

export async function GET(request:NextRequest,{params}:usernameProps){
    const {username} = params;
    console.log(username);
    
    
    return NextResponse.json({username:username})
}