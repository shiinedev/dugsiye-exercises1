import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import authRoutes from "./routes/user.route"
import transactionRoutes from "./routes/transaction.route"

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/transactions",transactionRoutes)

mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log("✅ Mongodb is connected successfully"))
.catch((err) => console.log("mongodb connection error",err))

app.listen(PORT,() =>{
    console.log(`server is running on ${PORT}`);
})

