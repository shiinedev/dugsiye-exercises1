import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js';

export const register = async(req, res,next) =>{

    let {name,email,password,role,profile} = req.body;
    
    try {
        email = email.toLowerCase();
        const exist = await User.findOne({ email })
        if(exist) return res.status(400).json({message:"email already exists"});

        const user = await User.create({name,email,password,role,profile});

        res.status(201).json({user})
    } catch (error) {
         next(error)
    }
}


export const login = async(req, res, next) =>{

    let {email,password} = req.body;

    try {
        email = email.toLowerCase();

        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) return res.status(404).json({message:"email or password are incorrect"});

        const token = generateToken(user._id);
        res.json({token})


    } catch (error) {
        next(error)
    }
}

