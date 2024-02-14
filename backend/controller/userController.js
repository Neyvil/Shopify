import asyncHandler from "../middilewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Checking if USER filling the field's or NOT
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs");
  }

  // Checking USER EXIST OR NOT
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("Email Already Registered");

/* 
What is Salt?
Ans:In simpler terms, a "salt" is a randomly generated value used to add complexity and uniqueness to a hashed password. 
It's like adding a secret ingredient to a recipe that makes it harder for someone to guess the original password. 
The salt ensures that even if two users have the same password, their hashed passwords will look different, enhancing security by thwarting certain types of attacks, 
like pre-computed rainbow table attacks.
*/

  // Generate a salt for password hashing with bcrypt.
  const salt = await bcrypt.genSalt(10);

  // Hash the user's password using bcrypt and the generated salt.
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating Newuser
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    // Cookies Creation
    createToken(res,newUser._id)

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asyncHandler(async(req,res)=>{
  const{email, password}=req.body;
  console.log(email)
  console.log(password)
  
  const existingUser= await User.findOne({email})
  if(existingUser){
    const isPasswordValid=await bcrypt.compare(password, existingUser.password)

    if(isPasswordValid){
      createToken(res,existingUser._id)

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }

})

const logoutCurrentUser=asyncHandler(async(req,res)=>{

})

export { createUser, loginUser ,logoutCurrentUser};
