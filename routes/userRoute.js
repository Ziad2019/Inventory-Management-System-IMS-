import express from "express";

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteUsers,
  changePassword,
 
} from"../controllers/userController.js";

//import validation of User data
import {
  createValidator,
  updateValidator,
  deleteValidator,
  changePasswordValidator,
} from "../utils/validator/userValidator.js";
//import protect and allowed access user
import {protect,allowedTo} from "../controllers/authController.js"

//midelware check owner
import {checkOwnership}from "../middleWare/checkOwnerShip.js"

const router = express.Router();

// route
router
  .route("/user")
  .post(protect,allowedTo("admin"),createValidator, createUser)
  .get(protect,allowedTo("admin"), getUsers) 
  .delete(protect,allowedTo("admin"), deleteUsers); 
router
  .route("/user/:id")
  .get(protect,allowedTo("admin"), getUser) 
  .put( protect,allowedTo("admin"), updateValidator,updateUser)
  .delete(protect, deleteValidator, deleteUser);

  router.route("/changePassword/:id").put(protect,checkOwnership, changePasswordValidator,changePassword);





//export route
export default router;
