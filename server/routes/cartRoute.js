import express from "express";
import { createCart, getAllCarts, getCartById, updateCart, deleteCart } from "../controllers/cartController.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getCartById);

router.get("/", getAllCarts);

router.post("/create", isAuthenticated, createCart);

router.put("/update/:id", isAuthenticated, updateCart);

router.delete("/delete/:id", isAuthenticated, deleteCart);

export default router;
