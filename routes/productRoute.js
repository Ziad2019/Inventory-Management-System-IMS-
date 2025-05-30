import express from "express";
//import protect and allowed access user
import {protect,allowedTo} from "../controllers/authController.js"

import
  {createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
   } from "../controllers/productController.js";

   //import validation of supplier data
   import {
     createValidator,
     updateValidator,
     deleteValidator
   } from "../utils/validator/productValidator.js";

const router = express.Router();

//route
router
  .route("/products")
  .post(protect,allowedTo("admin","manager"),createValidator,createProduct)
  .get(getProducts)
  .delete(protect,allowedTo("admin","manager"),deleteProducts);
router
  .route("/products/:id")
  .get(getProduct)
  .put(protect,allowedTo("admin","manager"),updateValidator,updateProduct)
  .delete(protect,allowedTo("admin","manager"),deleteValidator,deleteProduct);
//export route
export default router;
