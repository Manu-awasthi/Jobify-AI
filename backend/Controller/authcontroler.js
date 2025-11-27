import bcrypt from "bcrypt";
import User from "../Models/User";
import jwt from 'jsonwebtoken';

const generateAccessToken = (UserId) =>{
    return jwt.sign({UserId} , process.env.jWT_SECRET , {expireIn: "15m"}

    )
}

const generateRefreshToken = (UserId) =>{
    return jwt.sign({UserId}, process.env.jWT_REFRESH_SECRET , {expiresIn: "7D"})
}

export const signup = async (req , res)=>{
    try{
        const{name , email , password} = req.body;
        let user = await User.findOne({email})
        if (user) return res.status(400).json({msg:"user already exits"})
    }catch(err){
}
}
