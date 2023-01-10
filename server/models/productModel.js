import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
   },
   slug: {
      type: String,
      slug: "name",
      unique: true,
   },
   imageUrl: {
      type: String,
   },
   description: {
      type: String,
      trim: true,
   },
   stock: {
      type: Number,
   },
   price: {
      type: Number,
   },
   isActive: {
      type: Boolean,
      default: true,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
   },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
