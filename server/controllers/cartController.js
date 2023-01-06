import Cart from "../models/cartModel.js";

// Add a new cart
export const createCart = async (req, res) => {
   const newCart = new Cart({
      user: req.body.user,
      items: req.body.items,
   });

   try {
      const res = await newCart.save();
      res.status(201).json(res);
   } catch (error) {
      res.status(400).json({ message: "Unable to create cart", error: err });
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
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
