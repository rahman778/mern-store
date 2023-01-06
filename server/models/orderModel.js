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
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
   },
   totalPrice: {
      type: Number,
      required: true,
   },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
