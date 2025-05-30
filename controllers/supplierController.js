import asyncHandler from 'express-async-handler';

import Supplier from "../models/supplierModel.js";
import { createOne,getAll,getOne,updateOne,deleteOne} from './handlersFatory.js';

// @desc    Create Supplier
// @route   POST  /api/supplier
// @access  Private/Admin
export const createSupplier = createOne(Supplier);

//  @desc   get supplier
// @route   get /api/supplier
// @access  public/Admin
export const getSupplieries = getAll(Supplier);

// @desc   get    Supplier
// @route   get  /api/supplier/:id
// @access  public/Admin
export const getSupplier =getOne(Supplier);

// @desc  update Supplier
// @route   put  /api/supplier
// @access  Private/Admin
export const updateSupplier = updateOne(Supplier)

// @desc delete Supplier
// @route   delete  /apicategories
// @access  Private/Admin
export const deleteSupplier = deleteOne(Supplier)


