import express from "express";
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/orderController.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getOrderById);

router.get("/", getAllOrders);

router.post("/create", isAuthenticated, createOrder);

router.put("/update/:id", isAuthenticated, updateOrder);

router.delete("/delete/:id", isAuthenticated, deleteOrder);

export default router;
