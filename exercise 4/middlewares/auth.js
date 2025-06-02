import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const protect = async(req,res, next) =>{

    const token = req.headers.authorization?.split(" ")[1];
    
    try {
        if(!token) return res.status(401).json({message:"no token resolved"});

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decode.id).select('-password');
        console.log(req.user);
        
        next()
    } catch (error) {
        next(error)
    }
}
