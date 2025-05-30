import asyncHandler from 'express-async-handler';



// @desc Create 
 export const createOne=(Model)=>asyncHandler(async(req,res,next)=>{
  const create=await Model.create(req.body)
  res.status(201).json({data:create});
 })

 //@desc get all
 export const getAll=(Model)=>asyncHandler(async (req,res)=> {
    //find all document
    const documents=await Model.find();
    if (!documents.length) {
  return res.status(404).json({ message: "No categories available" });
}
    res.status(200).json({data:documents});
 })
 
  //@desc get one 
 export const getOne=(Model)=>asyncHandler(async (req,res)=> {
    //find one document
    const {id}=req.params;
  const getDocument= await Model.findById(id)
  if (!getDocument){
   res.status(404).json({message:`no found category about :${id}`})
  }
  res.status(200).json({data:getDocument})
 })
 
   //@desc update one 
 export const updateOne=(Model)=>asyncHandler(async (req,res)=> {
    // update document
    const {id}=req.params;
  const updateDoc= await Model.findByIdAndUpdate(id,req.body,{new:true})
  res.status(200).json({data:updateDoc})
 })

   //@desc delete one 
 export const deleteOne=(Model)=>asyncHandler(async (req,res)=> {
    // delete document
    const {id}=req.params;
  const deleteDoc= await Model.findByIdAndDelete(id)
  res.status(200).json({data:deleteDoc})
 })
 //@desc delete all 
 export const deleteAll=(Model)=>asyncHandler(async (req,res)=> {
    // delete documents
    const deleteDocs= await Model.deleteMany({})
  if (!deleteDocs.length) {
    return res.status(404).json({ message: "No Categories available" });
  }
  res.status(200).json({message:"procss of delete all is sucsess"})
 })

