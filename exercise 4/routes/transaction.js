import express from 'express'
import { createTransaction, deleteTransaction, getMyTransactions, monthlySummary, updateTransactions } from "../controllers/transaction.js";
import { validateSchema } from '../middlewares/validateZod.js';
import { transactionSchema } from '../schemas/transaction.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

/**
 * @swagger
 * /transaction/create:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post("/create", protect ,validateSchema(transactionSchema),createTransaction)
/**
 * @swagger
 * /transaction:
 *  get:
 *     summary: Get all transactions of logged in user
 *     tags: [Transactions]
 *     security:
 *         - bearerAuth: []
 *     responses:
 *         200:
 *           description: A list of transactions
 */
router.get("/", protect , getMyTransactions)

/**
 * @swagger
 * /transaction/monthly-summary:
 *   get:
 *     summary: Get monthly summary of transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-05-01"
 *         description: Full date (YYYY-MM-DD) from which to extract the month.
 *     responses:
 *       200:
 *         description: Summary of monthly transactions
 *         content:
 *           application/json:
 *             example:
 *               totalIncome: 2000
 *               totalExpense: 1500
 *               net: 500
 *               byCategory:
 *                 salary: 2000
 *                 rent: 1000
 *                 food: 500
 *       400:
 *         description: Invalid or missing date
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: No transactions found
 */

 router.get("/monthly-summary", protect , authorize('admin'),monthlySummary)

/**
 * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: transaction updated
 */
router.put("/:id", protect , updateTransactions)

/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete("/:id", protect , deleteTransaction)

export default router