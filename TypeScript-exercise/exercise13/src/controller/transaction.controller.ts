import { Response,Request, NextFunction} from "express";
import { createTransactionData, updateTransactionData } from "../types/transaction";
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from "../services/transaction.service";

export const handleCreateTransaction =async (req:Request<{},{},createTransactionData>,res:Response,next:NextFunction) =>{

    try {
        const transaction = await createTransaction(req.body);
        res.status(201).json(transaction)
    } catch (error) {
        next(error)
    }
}


export const handleGetTransactions = async(_req:Request, res:Response,next:NextFunction) =>{

    try {
        const transactions = await getTransactions();

        res.json(transactions)
    } catch (error) {
        next(error)
    }
}
export const handleGetTransactionId = async(req:Request<{id:string}>, res:Response,next:NextFunction) =>{

        const {id} = req.params;
    try {
        const transaction = await getTransactionById(id);

        res.json(transaction)
    } catch (error) {
        next(error)
    }
}

export const handleUpdateTransaction =async (req:Request<{id:string},{},updateTransactionData>, res:Response, next:NextFunction) =>{

    const {id} = req.params;
    try {
        const transaction = await updateTransaction(id,req.body);

        res.json(transaction)
    } catch (error) {
        next(error)
    }
}
export const handleDeleteTransaction =async (req:Request<{id:string}>, res:Response, next:NextFunction) =>{

    const {id} = req.params;
    try {
        const transaction = await deleteTransaction(id);

        res.json(transaction)
    } catch (error) {
        next(error)
    }
}