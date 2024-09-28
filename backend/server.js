import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import reviewRouter from "./Routes/review.js";
import bodyparser from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 

dotenv.config(); 
console.log(process.env.REACT_APP_MY_TOKEN_EXPIRE);

const app = express();

app.use(bodyparser.json());

app.use(
  cors({
    origin: "https://thriving-malabi-f9e261.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

//user Router
app.use("/api/user", userRouter);
//product router
app.use("/api/product", productRouter);
//cart router
app.use("/api/cart", cartRouter);
//address router
app.use("/api/address", addressRouter);
//review router
app.use("/api/review", reviewRouter);

mongoose
.connect(process.env.REACT_APP_MONGODB_URL, { dbName: process.env.REACT_APP_DB_NAME})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const port= process.env.REACT_APP_API_PORT || 5000;
app.listen(port, () => console.log(`server is listening on port!`));
