import jwt from "jsonwebtoken";

export const createToken=async(userId)=>{
   return jwt.sign({userId:userId},process.env.JWT_SECRIT_KEY,{expiresIn:process.env.JWT_EXPIRE_TIME})
}