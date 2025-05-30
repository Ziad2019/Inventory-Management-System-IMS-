

import { body, check } from "express-validator";
import validatorMiddleware  from "../../middleWare/validatorMiddleware.js";


// validator to create category
export const createValidator=[
    //check name 
    check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({max:32})
    .withMessage("too long category name")
    .isString()
    .withMessage("the name must be String"),
    //check Email
    check("contactEmail")
    .notEmpty()
    .withMessage("email is requird")
    .isEmail()
    .withMessage("invaild Email")
    .notEmpty()
    .withMessage("Email is requird"),
    //check phone
    check("phone")
    .notEmpty()
    .withMessage("phone is requird")
    .isMobilePhone("ar-EG",{strictMode:true})
    .withMessage('Invalid phone number format (strict mode enabled)'),
    // check adddress
    check("address")
    .notEmpty()
    .withMessage("address is requird"),
    validatorMiddleware
];
// validator to update category
export const updateValidator=[
    check("id")
    .isMongoId()
    .withMessage("invaild category id"),
    validatorMiddleware
]
// validator to delete category
export const deleteValidator=[
    check("id")
    .isMongoId()
    .withMessage("invaild category id"),
    validatorMiddleware
]