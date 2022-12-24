import Category from "../models/categoryModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getCategory = async (req, res, next) => {
   try {
      const slug = req.params.slug;

      const categoryDoc = await Category.findOne({ $or: [{ _id: slug }, { slug: slug }], isActive: true }).populate(
         "products"
         );

      if (!categoryDoc) {
         return next(new ErrorHandler("No product found", 404));
      }

      res.status(200).json({
         category: categoryDoc,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};

export const listCategory = async (req, res, next) => {
   try {
      const categories = await Category.find({ isActive: true });
      res.status(200).json({
         categories,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};

// add category
export const addCategory = async (req, res, next) => {
   const { name, isActive } = req.body;

   if (!name) {
      return next(new ErrorHandler("You must enter a name", 400));
   }

   const categoryData = {
      name,
      isActive,
   };

   const category = await Category.create(categoryData);

   res.status(201).json(category);
};

//update category
export const updateCategory = async (req, res, next) => {
   try {
      const categoryId = req.params.id;
      const update = req.body.category;
      const query = { _id: categoryId };
      const { slug } = req.body.category;

      const foundCategory = await Category.findOne({
         $or: [{ slug }],
      });

      if (foundCategory && foundCategory._id != categoryId) {
         return res.status(400).json({ error: "Slug is already in use." });
      }

      await Category.findOneAndUpdate(query, update, {
         new: true,
      });

      res.status(200).json({
         success: true,
         message: "Category has been updated successfully!",
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};
