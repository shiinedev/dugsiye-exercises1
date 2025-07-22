import Transaction from "../models/transaction.model";
import { createTransactionData, ITransaction, updateTransactionData } from "../types/transaction";


export async function createTransaction(data:createTransactionData) :Promise<ITransaction>{

    const {title,amount,type,category,createdBy} = data;

    if(!title || !amount || !type ||!category || !createdBy) 
      return {message:"all fields are required"} as any

    const transaction = await Transaction.create(data);

    await transaction.save();

    return {
        message:"transaction created successfully" ,
        transaction
    } as any
}

export async function getTransactions() : Promise<ITransaction[]>{

    const transactions = await Transaction.find();

    if(!transactions) return {message:"no transactions found"} as any

    return transactions
}

export async function getTransactionById(id:string) : Promise<ITransaction>{

    if(!id) return {message:"id is required"} as any
    const transaction = await Transaction.findOne({_id:id});

    if(!transaction) return {message:"no transactions found"} as any

    return transaction
}

export async function updateTransaction(id:string,data:updateTransactionData):Promise<updateTransactionData>{

    if(!id) return {message:"id is required"} as any

    const updateTransaction = await Transaction.findByIdAndUpdate({_id:id},data,{new:true})
    if(!updateTransaction) return {message:"transaction not found"} as any

    return updateTransaction
}

export async function deleteTransaction(id:string){

    if(!id) return {message:"id is required"} as any

    const transaction = await Transaction.findByIdAndDelete({_id:id})
    if(!transaction) return {message:"transaction not found"} as any

    return {message:"transaction deleted"} as any
}