

import Category from "../models/categoryModel.js";

import { createOne,getAll,getOne,updateOne,deleteOne,deleteAll } from './handlersFatory.js';


// @desc    Create category
// @route   POST  /apicategories
// @access  Private/Admin

export const createCategory=createOne(Category);

 // @desc   get categories
// @route   get /apicategories
// @access  public/Admin-Manager-staff
export const getCategories=getAll(Category);


 // @desc   get    category
// @route   get  /api/categories/:id
// @access  public/Admin-Manager-staff
export const getCategory=getOne(Category);

  // @desc  update category
// @route   put  /api/categories
// @access  Private/Admin
export const updateCategory=updateOne(Category)

   // @desc delete category
// @route   delete  /apicategories
// @access  Private/Admin
 export const deleteCategory=deleteOne(Category)

    // @desc delete all categories
// @route   delete  /api/categories
// @access  Private/Admin
export const deleteCategories=deleteAll(Category)