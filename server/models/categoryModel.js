import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

const options = {
   separator: '-',
   lang: 'en',
   truncate: 120
 };
 
 mongoose.plugin(slug, options);
 

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
