import { ROLE_ADMIN } from "../constants/index.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getUserProfile = async (req, res, next) => {
   const { user } = req;

   const findUser = await User.findById(user._id).select("-password");

   if (findUser) {
      res.status(200).json(findUser);
   } else {
      return next(new ErrorHandler("User not found", 404));
   }
};

export const updateUserProfile = async (req, res, next) => {
   const { name, username, phone, avatar, email, role } = req.body;

   const newUserData = {
      name,
      username,
      phone,
      avatar,
      email,
      role,
   };

   const userExists = await User.findOne({ email });

   if (userExists) {
      if (userExists._id.toString() !== req.user._id.toString() || req.user.role == ROLE_ADMIN) {
         await User.findByIdAndUpdate(req.user._id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
         });

         res.status(200).json({
            success: true,
         });
      } else {
         return next(new ErrorHandler("Permission denied", 403));
      }
   } else {
      return next(new ErrorHandler("User not found", 404));
   }
};

// get all users
export const getUsers = async (req, res) => {
   const users = await User.find().select("-password");
   res.status(200).json(users);
};

//delete user
export const deleteUser = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id);
      if (user && req.user.role == ROLE_ADMIN) {
         await user.remove();
         res.status(200).json({ message: "User removed" });
      } else {
         return next(new ErrorHandler("User not found", 404));
      }
   } catch (err) {
      next(err);
   }
};
