import express from 'express'

import { handleCreateTransaction, handleDeleteTransaction, handleGetTransactionId, handleGetTransactions, handleUpdateTransaction } from '../controller/transaction.controller';

const route = express.Router();

route.post("/",handleCreateTransaction)
route.get("/",handleGetTransactions)
route.get("/:id",handleGetTransactionId)
route.put("/:id",handleUpdateTransaction)
route.delete("/:id",handleDeleteTransaction)

export default route