import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
   },
   slug: {
      type: String,
      slug: "name",
      unique: true,
   },
   isActive: {
      type: Boolean,
      default: true,
   },
   products: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product",
      },
   ],
   updated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
