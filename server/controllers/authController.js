import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
   const { email, password, firstName, lastName, phone, role } = req.body;

   try {
      const existingUser = await User.findOne({ email });

      if (existingUser) return next(new ErrorHandler("User already exists", 401));

      const newUser = await User.create({
         firstName,
         lastName,
         email,
         phone,
         username : email,
         password,
         role,
      });

      res.status(201).json({ result: newUser, token: newUser.generateToken() });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong try again", error });
   }
};

export const signin = async (req, res, next) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
         return next(new ErrorHandler("User doesn't exist", 401));
      }

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
         return next(new ErrorHandler("Invalid Credentials", 401));
      }

      res.status(200).json({ token: user.generateToken() });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
   }
};
