import  express from "express";
import { goodbyController } from "../controller/goodby.controller";

const router = express.Router();

router.post("/",goodbyController);


export default router