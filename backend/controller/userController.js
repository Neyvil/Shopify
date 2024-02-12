import asyncHandler from '../middilewares/asyncHandler.js';

const createUser = asyncHandler(async (req,res)=>{
        res.send("hello")
});


export { createUser };