import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// fetch product slug api
export const getProduct = async (req, res, next) => {
   try {
      const slug = req.params.slug;

      const productDoc = await Product.findOne({ $or: [{ _id: slug }, { slug: slug }], isActive: true }).populate({
         path: "category",
         select: "name slug",
      });

      if (!productDoc) {
         return next(new ErrorHandler("No product found", 404));
      }

      res.status(200).json({
         data: productDoc,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};

export const searchProduct = async (req, res) => {
   try {
      const name = req.params.name;

      const productDoc = await Product.find(
         { name: { $regex: new RegExp(name), $options: "is" }, isActive: true },
         { name: 1, slug: 1, imageUrl: 1, price: 1, _id: 0 }
      );

      if (productDoc.length < 0) {
         return next(new ErrorHandler("No product found", 404));
      }

      res.status(200).json({
         products: productDoc,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};

// list products
export const listProducts = async (req, res) => {
   try {
      const pageSize = 10;
      const page = Number(req.query.pageNumber) || 1;

      const keyword = req.query.keyword
         ? {
              name: {
                 $regex: req.query.keyword,
                 $options: "i",
              },
           }
         : {};

      const count = await Product.countDocuments({ ...keyword });
      const products = await Product.find({ ...keyword }).populate({
         path: "category",
         select: "name slug",
      }).limit(pageSize)
         .skip(pageSize * (page - 1));

      res.status(200).json({ items:products, page, pages: Math.ceil(count / pageSize) });

   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};

// add product
export const addProduct = async (req, res, next) => {
   const { name, description, inventory, price, category, isActive } = req.body;
   const imageUrl = req.file.location;

   try {
      const productData = {
         name,
         description,
         inventory,
         price,
         imageUrl,
         category,
         isActive,
      };

      if (!name) {
         return next(new ErrorHandler("You must enter a name", 400));
      }

      const product = await Product.create(productData);
      const categoryDoc = await Category.findById(category);
      categoryDoc.products.push(product._id);
      await categoryDoc.save();

      res.status(200).json({
         success: true,
         message: `Product has been added successfully!`,
         product,
      });
   } catch (error) {
      console.log('error', error)
      return res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};

//update product
export const updateProduct = async (req, res, next) => {
   try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };
      const { slug } = req.body.product;

      const foundProduct = await Product.findOne({
         $or: [{ slug }],
      });

      if (foundProduct && foundProduct._id != productId) {
         return next(new ErrorHandler("Slug is already in use.", 400));
      }

      await Product.findOneAndUpdate(query, update, {
         new: true,
      });

      res.status(200).json({
         success: true,
         message: "Product has been updated successfully!",
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
};
