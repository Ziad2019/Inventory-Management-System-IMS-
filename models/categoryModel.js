import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
     name:{
        type:String,
        requird:[true,"name is required"],
        unique: [true, 'Category must be unique'],
        minlength: [3, 'Too short category name'],
        maxlength: [32, 'Too long category name'],
     },
     description:{
         type:String,
       minlength: [20, 'Too short product description']
     }
},
{
    timestamps:true
});

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);


export default CategoryModel;