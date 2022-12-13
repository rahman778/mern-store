import express from "express";

import { deleteUser, getUserProfile, getUsers, updateUserProfile } from "../controllers/userController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", isAuthenticated, getUserProfile);

router.put("/me", isAuthenticated, updateUserProfile);

router.get("/all", isAuthenticated, getUsers);

router.delete("/:id", isAuthenticated, isAdmin, deleteUser);

export default router;
