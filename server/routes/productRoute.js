import express from "express";
import { addProduct, getProduct, listProducts, searchProduct, updateProduct } from "../controllers/productController.js";

import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:slug", getProduct);

router.get("/search/:name", searchProduct);

router.get("/", listProducts);

router.post("/create", isAuthenticated, isAdmin, addProduct);

router.put("/update", isAuthenticated, isAdmin, updateProduct);

export default router;