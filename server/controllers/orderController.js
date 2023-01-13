import Order from "../models/orderModel.js";

// Add a new order
export const addOrder = async (req, res) => {
   try {
      const newOrder = await Order.create({
         user: req.user._id,
         cart: req.body.cart,
         totalPrice: req.body.totalPrice,
         type: req.body.type,
      });

      res.status(201).json({ success: true, data: newOrder });
   } catch (error) {
      res.status(400).json({ message: "Unable to add order", error });
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
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
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
