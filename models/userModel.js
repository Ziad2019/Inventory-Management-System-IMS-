import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema=mongoose.Schema({
     name:{
        type:String,
        trim:true,
        required:[true,"user name is required"],
        maxlength:[20,"too long user name"],
     },
     email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true
     },
     password:{
        type:String,
        required:[true,"password user is required"],
        minlength:[6,"too short user password"],
     },
     passwordChangeAt:Date ,
     hashResetCode:String,
     passwordResetExpires:Date,
     passwordResetVerified:Boolean,

     role:{
        type:String,
        enum:["admin","manager","staff"],
        default:"staff"
     },
     phone:{
      type:String
     }
}

    ,{timestamps:true})

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

    const User=mongoose.model("User",userSchema);
   export default User;