import asyncHandler from "express-async-handler";

import Transactions from "../models/transactionsModel.js";
import Product from "../models/productModel.js";

//desc record Stock Transactions
//route Post api/transactions
//access Puplic
export const recordStockTransactions=asyncHandler(async(req,res)=>{
        const {type,quantity,productID}=req.body;
    //Data validation
      if(quantity<=0){
        return res.status(400).json({ message: 'Quantity must be greater than 0' });
      }

    //  Product search
     const  product=await Product.findById(productID);
     if(!product){
         return res.status(404).json({ message: 'Product not found' });
     }
    //3 Check the available quantity if it is a sale transaction
    if(type==="sale" && product.quantityInStock<quantity){
    return res.status(400).json({ message: 'Insufficient stock for sale' });
    }

    //4 Calculate the total amount
   const totalAmount=product.price*quantity;

    //5 Update stock quantity
     if(type==="sale"){
       product.quantityInStock-=quantity;
     }
     if(type==="purchase"){
       product.quantityInStock+=quantity
     }
     // save product date 
    await product.save();

   //record transaction
   
   const transactions=new Transactions({
    productID,
    quantity,
    totalAmount,
    userId:req.user.id,
    type
   })
  await transactions.save();

    res.status(201).json({ message: 'Stock transaction recorded',transactions });
  
})

//desc get Stock transactions
//route Post api/transactions
//access (sdmin or manager)
export const getStockTransactions =asyncHandler( async (req, res) => {
 
    const transactions = await Transactions.find()
      .populate('productId')
      .populate('userId')
      .sort({ date: -1 }); 
    res.json(transactions);
 
});

//desc get Stock Transactions By Product
//route Post api/transactions/producdId
//access (admin or manager)
export const getStockTransactionsByProduct =asyncHandler( async (req, res) => {
  const { productId } = req.params;
  
    const transactions = await Transactions.find({productId} )
      .populate('productId')
      .populate('userId')
      .sort({ date: -1 });
    res.json(transactions);
 
});