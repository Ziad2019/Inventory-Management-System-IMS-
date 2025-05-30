import express from "express";

import {
  createSupplier,
  getSupplieries,
  getSupplier,
  updateSupplier,
  deleteSupplier
} from"../controllers/supplierController.js";

//import validation of supplier data
import {
  createValidator,
  updateValidator,
  deleteValidator
} from "../utils/validator/supplierValidator.js";
//import protect and allowed access user
import {protect,allowedTo} from "../controllers/authController.js"

const router = express.Router();

//route
router
  .route("/supplier")
  .post(protect,allowedTo("admin"),createValidator,createSupplier)
  .get(protect,allowedTo("admin"),getSupplieries)
  
router
  .route("/supplier/:id")
  .get(protect,allowedTo("admin"),getSupplier)
  .put(protect,allowedTo("admin"),updateValidator,updateSupplier)
  .delete(protect,allowedTo("admin"),deleteValidator,deleteSupplier);
//export route
export default router;
