

import { body, check } from "express-validator";
import validatorMiddleware  from "../../middleWare/validatorMiddleware.js";
import Category from "../../models/categoryModel.js";
import Supplier from "../../models/supplierModel.js"


// validator to create category
export const createValidator = [
  // validation to name
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ max: 32 })
    .withMessage("too long category name")
    .isString()
    .withMessage("the name must be String"),

  // validation to description
  check("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 2 })
    .withMessage("too short description name")
    .isLength({ max: 200 })
    .withMessage("too long category name"),
  // validation to price
  check("price")
    .notEmpty()
    .withMessage("price is requird ")
    .isNumeric()
    .withMessage("price must be numeric"),
  // validation to quantity in stock
  check("quantityInStock")
    .notEmpty()
    .withMessage("quantity in stock is requird ")
    .isNumeric(),
  // validation to categoryId
  check("categoryId")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        return Promise.reject(
          new Error(`No category for this id: ${categoryId}`)
        );
      }
      return true;
    }),
     check("supplierId")
    .notEmpty()
    .withMessage("Product must be belong to a supplier")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (supplierId) => {
      const supplier = await Supplier.findById(supplierId);
      if (!supplier) {
        return Promise.reject(
          new Error(`No supplier for this id: ${supplierId}`)
        );
      }
      return true;
    })
    ,

  validatorMiddleware,
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