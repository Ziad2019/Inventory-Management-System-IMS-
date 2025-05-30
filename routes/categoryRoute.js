import express from "express";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteCategories
} from "../controllers/categoryController.js";

import {
  createValidator,
  updateValidator,
  deleteValidator,
} from "../utils/validator/categoryValidator.js";

//import protect and allowed access user
import {protect,allowedTo} from "../controllers/authController.js"



const router = express.Router();


//route
router.route("/categories").post(protect,allowedTo("admin"),createValidator,createCategory)
.get(protect,getCategories).
delete(protect,allowedTo("admin"),deleteCategories)

router
  .route("/categories/:id")
  .get(protect,getCategory)
  .put(protect,allowedTo("admin"),updateValidator,updateCategory)
  .delete(protect,allowedTo("admin"),deleteValidator,deleteCategory);
//export route
export default router;
