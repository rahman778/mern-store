import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Add a new cart
export const addCart = async (req, res) => {
   try {
      const user = req.user._id;
      const items = req.body.items;

      const newCart = await Cart.create({
         user,
         items,
      });

      decreaseQuantity(items);

      res.status(201).json({
         success: true,
         data: newCart
      });
   } catch (error) {
      res.status(400).json({
         error: "Unable to create cart.",
      });
   }
};

// Get all carts
export const getAllCarts = async (req, res) => {
   try {
      const carts = await Cart.find();
      res.status(200).json({
         carts,
      });
   } catch (error) {
      res.status(400).json({ message: "Unable to fetch carts", error });
   }
};

// Get a single cart
export const getCartById = async (req, res) => {
   try {
      const cart = Cart.findById(req.params.id);
      res.status(200).json(cart);
   } catch (error) {
      res.status(400).json({ message: "Unable to fetch cart", error });
   }
};

// Update a cart
export const updateCart = async (req, res) => {
   try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
      res.status(200).json(cart);
   } catch (error) {
      res.status(400).json({ message: "Unable to update cart", error });
   }
};

// Delete a cart
export const deleteCart = async (req, res) => {
   try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json(cart);
   } catch (error) {
      res.status(400).json({ message: "Unable to delete cart", error });
   }
};


const decreaseQuantity = products => {
   let bulkOptions = products.map(item => {
     return {
       updateOne: {
         filter: { _id: item.product },
         update: { $inc: { inventory: -item.quantity } }
       }
     };
   });
 
   Product.bulkWrite(bulkOptions);
 };