import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js';


export const register = async(req, res, next) =>{
    let {name, email,password,role} = req.body;

    try {
        email = email.toLowerCase();
        const exist = await User.findOne({email})
        if(exist) return res.status(401).json({message:"email already in use"});
        const newUser = await User.create({name,email,password,role})
        const token =  generateToken(newUser._id);
        res.status(201).json({token});
    } catch (error) {
        next(error)
    }
}


export const login = async(req, res, next) =>{
    let {email,password} = req.body;
    try {
        email = email.toLowerCase();
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) return res.status(404).json({message:"email or password is not correct"});

        const token = generateToken(user._id);

        res.json({token})
    } catch (error) {
        next(error)
    }
}

