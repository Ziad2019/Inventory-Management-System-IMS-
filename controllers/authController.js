import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs';
import User from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";



//desc register user
//route Post api/auth/register
//access Puplic

export const register=asyncHandler(async(req,res)=>{
  
        //create user 
    const userRegister=await User.create({ 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

    // generate Token
   const token=await createToken(userRegister._id);
   res.status(201).json({userRegister,token});
  
})

//desc login user
//route Post api/auth/login
//access Puplic
export const login= asyncHandler(async(req,res,next)=>{
     
 const userlogin=await User.findOne({email:req.body.email})

     if(!userlogin||! await (bcrypt.compare(req.body.password, userlogin.password))){
         return res.status(401).json({ message: "Incorrect email or password" });
     }

 // generate Token
   const token=await createToken(userlogin._id);
   res.status(201).json({userlogin,token});
   
})

//desc protect user

//access Puplic

export const protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
     return res.status(401).json({ message: "No token provided. Please login to access this route." });
  }


  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRIT_KEY);

 
  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return res.status(401).json({ message: "User not found. The token is invalid." });
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return res.status(401).json({ message: "Password changed. Please login again." });
    }
  }
  req.user = currentUser;
  next();
});


//desc allowedto user
//access Puplic and private
export const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
     return res
      .status(403)
      .json({
        message:
          "Incorrect email or You are not login, You are not allowed to access this route login to get access this route password",
      });
    }
    next();
  });

  //desc forgotPassword user
//route Post api/auth/forgotPassword
//access Puplic
export const forgotPassword= asyncHandler(async(req,res,next)=>{
//get user by email
const user=await User.findOne({email:req.body.email})
   if (!user){
    return res.status(404).json({message:`there is no user with this email :${req.body.email}`})
   }
//if user exist, generate hash reset random 6 digit and save in data base 
const resetCode=Math.floor(100000+Math.random()*900000).toString();
// to convert reset code to hash reset  code 
user.hashResetCode= await bcrypt.hash(resetCode,12);
// to save now time in data base
user.passwordResetExpires=Date.now()+10*60*1000;
user.passwordResetVerified=false;
//to save everythings
await user.save();
const message=`Hi\n ${user.name} we recived request reset of password on your IMS\n ${resetCode} `
await sendEmail({
  email:user.email,
  subject:"your passsword reset code (vaild for 10min)",
  message
})

    res.status(200).json({ message: "we send reset code to your Email" });
})

//desc verifiy reset code user
//route Post api/auth/verifyResetCode
//access Puplic
export const verifyResetCode = asyncHandler(async (req, res, next) => {
    const { resetCode } = req.body;
    const user = await User.findOne({
        passwordResetExpires: { $gt: Date.now() }, // التأكد من أن الرمز لم ينتهِ صلاحيته
    });
    if (!user) {
        return res.status(404).json({ message: `رمز إعادة التعيين غير موجود أو منتهي الصلاحية` });
    }
    // مقارنة الرمز المدخل مع الرمز المشفر في قاعدة البيانات
    const isValidCode = await bcrypt.compare(resetCode, user.hashResetCode);
    if (!isValidCode) {
        return res.status(400).json({ message: `رمز إعادة التعيين غير صحيح` });
    }
    // إذا كان الرمز صحيحًا
    user.passwordResetVerified = true;
    await user.save();
    res.status(200).json({ status: "Success" });
});

//desc verifiy reset code user
//route Post api/auth/forgotPassword
//access Puplic
export const resetPassword = asyncHandler(async (req, res, next) => {
  const user= await User.findOne({email:req.body.email})
  if(!user){
    return res.status(400).json({ message:"there no user with this wmail" })
  }
  if(!user.passwordResetVerified){
    return res.status(400).json({ message:"reset code not verified" })
  }
  user.password=req.body.newPassword;
  user.verifyResetCode=undefined;
  user.passwordResetExpires=undefined;
    user.passwordResetVerified = undefined;
     user.hashResetCode = undefined;
await user.save();
// generate token
const token =createToken(user._id);
res.status(200).json({token})
console.log( user.password)
});

