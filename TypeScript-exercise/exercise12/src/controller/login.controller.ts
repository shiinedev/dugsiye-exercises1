import { Request,Response } from "express";
import { LoginBody } from "../types/User";


type query ={
    page?:string,
    limit?:string
}

type params = {
    id:String
}

type body ={
    name:string,
    price:string
}

export const login = (req:Request<{},{},LoginBody>,res:Response) =>{
    
    const {email,password} = req.body;

    if(!email || !password){
      return  res.status(404).json({message:"email and password are required"})
    }

    res.json({
       message: "User logged in successfully ",
       user:{
        email,
        password
    }
    })
 }


 export const getProducts = (req:Request<{},{},{},query>,res:Response) =>{

    const {page,limit} = req.query;

    res.json({message:`Products fetched successfully page ${page} with ${limit}`})

 }

 export const getProductById = (req:Request<params,Body>,res:Response) =>{

    const {id} = req.params;
    const {name,price} = req.body


    if(!id) {
        return res.status(404).json({message:`${id} product not found`})
    }

    if(!name || !price){
        return res.status(404).json({message:"name and price are required"})
    }

    res.json({message:`product name: ${name} and price:${price}`});

 }