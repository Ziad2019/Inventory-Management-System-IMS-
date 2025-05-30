import express from "express";

import { recordStockTransactions,getStockTransactions,getStockTransactionsByProduct } from "../controllers/transactionController.js";
 import { protect,allowedTo } from "../controllers/authController.js";

 const router=express.Router()

router.route("/transactions")
  .post(protect, allowedTo("admin", "manager", "staff"), recordStockTransactions)
  .get(protect, allowedTo("admin", "manager"), getStockTransactions);

router.route("/transactions/:id")
  .get(protect, allowedTo("admin", "manager"), getStockTransactionsByProduct);

export default router;
