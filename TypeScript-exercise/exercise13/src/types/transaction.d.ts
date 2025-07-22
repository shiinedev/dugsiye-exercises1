import {Document, ObjectId} from "mongoose"

export interface ITransaction extends Document{
    title:String,
    amount:number,
    type: "income" | "expense",
    category:string,
    date:Date,
    createdBy:ObjectId
}

export type createTransactionData = Omit<ITransaction,"_id">

export type updateTransactionData ={
    title?:String,
    amount?:number,
    type?: "income" | "expense",
    category?:string,
    date?:Date,
    createdBy?:ObjectId
}