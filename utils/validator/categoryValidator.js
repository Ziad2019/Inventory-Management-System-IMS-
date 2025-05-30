

import { body, check} from "express-validator";
import validatorMiddleware  from "../../middleWare/validatorMiddleware.js";


// validator to create category
export const createValidator=[
    check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({max:32})
    .withMessage("too long category name")
    .isString()
    .withMessage("the name must be String"),
    check("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({min:2})
    .withMessage("too short description name")
    .isLength({max:200})
    .withMessage("too long category name"),
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