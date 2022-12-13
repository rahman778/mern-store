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
   quantity: {
      type: Number,
   },
   price: {
      type: Number,
   },
   taxable: {
      type: Boolean,
      default: false,
   },
   isActive: {
      type: Boolean,
      default: true,
   },
   brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
   },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
