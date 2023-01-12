import express from "express";
import { addCart, getAllCarts, getCartById, updateCart, deleteCart } from "../controllers/cartController.js";

import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getCartById);

router.get("/", isAuthenticated, isAdmin, getAllCarts);

router.post("/add", isAuthenticated, addCart);

router.put("/update/:id", isAuthenticated, updateCart);

router.delete("/delete/:id", isAuthenticated, deleteCart);

export default router;
