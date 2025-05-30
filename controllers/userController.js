import asyncHandler from 'express-async-handler';
import bcrypt, { hash } from"bcryptjs"
import User from "../models/userModel.js"

import { createOne,getAll,getOne,deleteOne,deleteAll } from './handlersFatory.js';


// @desc    Create User
// @route   POST  /api/User
// @access  Private/Admin-Manager
export const createUser = createOne(User);

//  @desc   get User
// @route   get /api/User
// @access  public/Admin-Manager
export const getUsers = getAll(User);

// @desc   get    User
// @route   get  /api/User/:id
// @access  public/Admin-Manager
export const getUser =getOne(User);

// @desc  update User
// @route   put  /api/User
// @access  Private/Admin-Manager
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
   const {password,...otherData}=req.body
  const user = await User.findByIdAndUpdate(id, otherData, {
    new: true,
  });
  res.status(200).json({ data: user });
});


// @desc  changePassword User
// @route   put  /api/changePassword:id
// @access  public
export const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
   const {password}=req.body
   const hashPassword=await bcrypt.hash(password,12)
  const user = await User.findByIdAndUpdate(id,{password: hashPassword,passwordChangeAt:Date.now()}, {
    new: true,
  });
  res.status(200).json({ data: user });
});

// @desc delete User
// @route   delete  /apicategories
// @access  Private/Admin-Manager
export const deleteUser = deleteOne(User)

// @desc delete all Useries
// @route   delete  /api/Useries
// @access  Private/Admin-Manager
export const deleteUsers = deleteAll(User)

// @desc getme user
// @route   delete  /api/getme
// @access  public
export const getme = asyncHandler(async (req, res,next) => {
  req.params.id=req.user._id
 next();
});