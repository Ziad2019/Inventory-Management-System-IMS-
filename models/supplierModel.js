import mongoose from "mongoose";

const supplierSchema=mongoose.Schema({
     name:{
        type:String,
        trim:true,
        requird:[true,"please,enter supplier name "],
     },

      contactEmail: String,
      phone: String,
      address: String,
},
{
    timestamps:true
});

// 2- Create model
const Supplier = mongoose.model('Supplier', supplierSchema);


export default Supplier;