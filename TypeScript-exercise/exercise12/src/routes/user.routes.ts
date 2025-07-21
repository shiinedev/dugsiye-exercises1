import express from 'express'
import { getProductById, getProducts, login } from '../controller/login.controller';


const router = express.Router();

router.post("/login",login);
router.get("/products",getProducts);
router.get("/product/:id",getProductById);

export default router