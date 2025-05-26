import express from 'express'
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = express();


router.get("/dashboard",protect,authorize("admin"),(req,res)=>{

    res.send(`welcome admin mr ${req.user.name}`)
})

export default router