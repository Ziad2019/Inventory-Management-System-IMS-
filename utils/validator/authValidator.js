
import mongoose from 'mongoose';
import { body, check } from "express-validator";
import bcrypt from 'bcryptjs';

import validatorMiddleware  from "../../middleWare/validatorMiddleware.js";
import User from "../../models/userModel.js"


// validator to create user
export const registerValidator=[
  //User Name validator
    check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({max:20})
    .withMessage("too long user name")
    .isString()
    .withMessage("the user name must be String"),

    //User Email validator
    check("email")
    .notEmpty()
    .withMessage("email is requird")
    .isEmail()
    .withMessage("invaild Email")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
         throw new Error('E-mail already in use');
        }
        return true
      })
    ),
check("phone")
.optional()
.isMobilePhone(["ar-EG"])
.withMessage("your Phone Number is Invaild"),
    //User Password validator
     check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain at least one number")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
    ,
    //User Password confirm validator
    check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirm is requird")
    .custom((val,{req})=>{
      if(val!==req.body.password){
         throw new Error('Passwords do not match');
      }
       return true

    }),
    validatorMiddleware
];

// validator to login user
export const loginValidator=[
  
    //User Email validator
    check("email")
    .notEmpty()
    .withMessage("email is requird")
    .isEmail()
    .withMessage("invaild Email"),
    
    //User Password validator
     check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain at least one number")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter"),
    validatorMiddleware
];
