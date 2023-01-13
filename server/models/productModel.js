import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

const options = {
   separator: '-',
   lang: 'en',
   truncate: 120
 };

 mongoose.plugin(slug, options);

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
   inventory: {
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
