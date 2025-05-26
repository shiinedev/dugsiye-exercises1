import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req,res,next) =>{

    const token = await req.headers.authorization?.split(" ")[1];

    try {
        if(!token) return res.status(404).json({message:"no token resolved"})
        const decode =  jwt.verify(token,process.env.JWT_SECRET);
        
        req.user = await User.findById(decode.id).select("-password")
        next()
    } catch (error) {
        next(error);
    }

}