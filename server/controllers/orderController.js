import Order from "../models/orderModel.js";

// Add a new order
export const createOrder = async (req, res) => {
   const newOrder = new Order({
      user: req.body.user,
      cart: req.body.cart,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
   });

   try {
      const res = await newOrder.save();
      res.status(201).json(res);
   } catch (error) {
      res.status(400).json({ message: "Unable to create order", error });
   }
};

// Get all orders
export const getAllOrders = async (req, res) => {
   try {
      const orders = await Order.find();
      res.status(200).json({
         orders,
      });
   } catch (error) {
      res.status(400).json({ message: "Unable to fetch orders", error });
   }
};

// Get a single order
export const getOrderById = async (req, res) => {
   try {
      const order = Order.findById(req.params.id);
      res.status(200).json(order);
   } catch (error) {
      res.status(400).json({ message: "Unable to fetch order", error });
   }
};

// Update an order
export const updateOrder = async (req, res) => {
   try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(order);
   } catch (error) {
      res.status(400).json({ message: "Unable to update order", error });
   }
};

// Delete an order
export const deleteOrder = async (req, res) => {
   try {
      const order = await Order.findByIdAndDelete(req.params.id);
      res.status(200).json(order);
   } catch (error) {
      res.status(400).json({ message: "Unable to delete order", error });
   }
};
