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
console.log(process.env.MY_TOKEN_EXPIRE);

const app = express();

app.use(bodyparser.json());

app.use(
  cors({
    origin: true,
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
.connect(process.env.MONGODB_URL, { dbName: process.env.DB_NAME})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const port= process.env.API_PORT || 5000;
app.listen(port, () => console.log(`server is listening on port!`));
