import express from "express";

import {register,login,forgotPassword,verifyResetCode,resetPassword} from "../controllers/authController.js"

import {registerValidator,loginValidator,} from "../utils/validator/authValidator.js"

const router = express.Router();

router.post("/auth/register",registerValidator,register);
router.post("/auth/login",loginValidator,login);
router.post("/auth/forgotPassword",forgotPassword);
router.post("/auth/verifiyResetCode",verifyResetCode);
router.put("/auth/resetPassword",resetPassword);

export default router;