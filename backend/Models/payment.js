import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    orderDate:{type:Date,default:Date.now},
  paymentStatus: {
    type: String,
  }
},{strict:false});


export const Payment = mongoose.model("Payment", PaymentSchema);
