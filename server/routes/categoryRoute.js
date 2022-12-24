import express from "express";
import { addCategory, getCategory, listCategory, updateCategory } from "../controllers/categoryController.js";

import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:slug", getCategory);

router.get("/", listCategory);

router.post("/create", isAuthenticated, isAdmin, addCategory);

router.put("/update", isAuthenticated, isAdmin, updateCategory);

export default router;
