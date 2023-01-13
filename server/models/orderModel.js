import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
   },
   status: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
   },
   type: {
      type: String,
      enum: ["EXPRESS", "STANDARD",],
      default: "STANDARD",
   },
   totalPrice: {
      type: Number,
      required: true,
   },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
