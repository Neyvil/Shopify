// packages

import path from "path";
import userRoutes from "./routes/userRoutes.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/categoryRoutes.js"

//Utiles
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Idid mistake here

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
