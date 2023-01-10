import express from "express";
import { addAddress, getAddress, getAllAddress, updateAddress, deleteAddress } from "../controllers/cartController.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getAddress);

router.get("/", isAuthenticated, getAllAddress);

router.post("/add", isAuthenticated, addAddress);

router.put("/:id", isAuthenticated, updateAddress);

router.delete("/delete/:id", isAuthenticated, deleteAddress);

export default router;
