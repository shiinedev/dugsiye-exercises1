import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import authRoutes from "./routes/auth.js"
import uploadRoutes from './routes/upload.js'
import { notFound } from './middlewares/notFound.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
import transactionRoutes from './routes/transaction.js'
import { limiter } from './middlewares/rateLimit.js'

dotenv.config();
const PORT = process.env.PORT;



const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(limiter)
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:8080","https://finance-track-nf6s.onrender.com","http://localhost:5173","https://finance-track-chi.vercel.app/"]
}));
app.use(logger);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/transaction",transactionRoutes)
app.use("/api/upload",uploadRoutes)



//error middlewares
app.use(notFound);
app.use(errorHandler);



mongoose.connect(process.env.NODE_ENV == "development"? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
.then(()=> console.log("✅MongoDb connected locally"))
.catch((err) => console.log("❌connection error",err))

app.listen(PORT,() =>{
    console.log(`server running on http://localhost:${PORT}`);
})
