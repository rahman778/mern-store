import jwt from "jsonwebtoken";
import { ROLE_ADMIN } from "../constants/index.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
   }

   if (!token) {
      return next(new ErrorHandler("Not authorized to access this route", 401));
   }

   try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData.id);

      next();
   } catch (err) {
      return next(new ErrorHandler("Not authorized to access this router", 401));
   }
};

export const isAdmin = (req, res, next) => {
   if (req.user && req.user.role === ROLE_ADMIN) {
     next()
   } else {
     return next(new ErrorHandler("Not authorized as an admin", 401));
   }
 }
