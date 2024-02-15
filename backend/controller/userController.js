import asyncHandler from "../middilewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

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
    createToken(res, newUser._id);

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

// LOG IN USER

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Checking user existance through email

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Compare The Password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);
      // Showing to the User
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});

// LOG OUT User
const logoutCurrentUser = asyncHandler(async (req, res) => {
  // Just Deleting the Cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Log Out Succesfully" });
});

// Showing All Profiles To Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Current User Profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(405);
    throw new Error("User not found !!");
  }
});

// Updating User data
const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // Checking the Username and Email
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    // Checking the Password and Encrypting it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    // Updating the User
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new error("User not found");
  }
});

// Deleting the USER By ADMIN
const deleteUserById=asyncHandler(async(req,res)=>{

  /*
  "req.params.id" refers to the value of the "id" parameter in the URL 
  (which is in route like :"router.route("/:_id")")
  that is being sent as a part of the HTTP request.
  */

  const user = await User.findById(req.params.id);

  if(user){
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Cannot Delete Admin User');
    }
    
    await User.deleteOne({_id: user._id})
    res.json({
      message:"User Removed"
    })

  }else {
    res.status(404) 
    throw new Error("User Not Found") 
  }


});

// Get User

const getUserById=asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id).select('-password')

  if(user){
    res.json(user)
  }
})

// Updating user
const updateUserById=asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);

  if (user){
    // If User provide username it store to username, if not then old username will store
    user.username = req.body.username || user.username

    // If User provide email it store to email , if not then old email will store
    user.email= req.body.email || user.email

    user.isAdmin= Boolean(req.body.isAdmin)

    const updateUser = await user.save()

    res.json({
      _id: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })

  }
  else{
    res.status(404);
    throw new Error("User Not Found") ;
  }
})

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById
};
