import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please, enter the name product"],
        maxlength:[32,"too long this name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please,enter the description product"],
        minlength:[20,"too short description product"],
    },
    price:{
        type:Number,
        required:[true,"please,enter the price product"]
    },
    quantityInStock:{
        type:Number
    },
    categoryId:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        required:[true,"please,enter the category id"]
    },
    supplierId:{
        type:mongoose.Schema.ObjectId,
        ref:"Supplier",
        required:[true,"please,enter the supplier id"]
    }

}
    ,{timestamps:true})

// 2- Create model
const Product = mongoose.model('Product', productSchema);


export default Product;
