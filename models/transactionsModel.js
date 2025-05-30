import mongoose from "mongoose";

const transactionsSchema=mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    require:[true,"please enter product Id"]
  },
   quantity:{
    type:Number,
    require:[true,"please enter quantity"]
   },
   type:{
    type:String,
    enum:["sale","purchase"],
    require:[true,"please enter type of transaction:[sale or purchase]"]
   },
   date:{
    type:Date,
    default:Date.now
   },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:[true,"please enter user Id"]
   },
   totalAmount:{
    type:Number,
    
   }
   
} , 
{
    timestamps:true
});

// 2- Create model
const Transactions = mongoose.model('Transactions', transactionsSchema);


export default Transactions;