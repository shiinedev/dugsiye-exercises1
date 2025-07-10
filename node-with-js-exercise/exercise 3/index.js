import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {logger} from './middlewares/logger.js'
import {notFound} from './middlewares/notFound.js'
import {errorHandler} from './middlewares/errorHandler.js'

dotenv.config();

const PORT = process.env.PORT;

const app = express();

import authRoutes from './routes/auth.js'
import admin from './routes/admin.js'

app.use(express.json());

app.use(logger)
//routes
app.use("/auth",authRoutes);
app.use("/admin",admin);


app.use(notFound)
app.use(errorHandler)


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("✅ mongoDb is connected to locally"))
.catch((err) => console.log("❌ connection error",err))

app.listen(PORT,() =>{
    console.log(`server is running on http://localhost:${PORT}`);
})