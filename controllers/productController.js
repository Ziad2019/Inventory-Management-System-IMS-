import asyncHandler from 'express-async-handler';

import Product from"../models/productModel.js";
import { createOne,getAll,getOne,updateOne,deleteOne,deleteAll } from './handlersFatory.js';

// @desc    Create Product
// @route   POST  /api/Product
// @access  Private/Admin-Manager
export const createProduct = createOne(Product);

//  @desc   get Product
// @route   get /api/Product
// @access  public/Admin-Manager
export const getProducts = getAll(Product);

// @desc   get    Product
// @route   get  /api/Product/:id
// @access  public/Admin-Manager
export const getProduct = getOne(Product);

// @desc  update Product
// @route   put  /api/Product
// @access  Private/Admin-Manager
export const updateProduct = updateOne(Product)

// @desc delete Product
// @route   delete  /apicategories
// @access  Private/Admin-Manager
export const deleteProduct = deleteOne(Product)

// @desc delete all Producties
// @route   delete  /api/Producties
// @access  Private/Admin-Manager
export const deleteProducts = deleteAll(Product)
