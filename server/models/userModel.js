import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ROLE_ADMIN, ROLE_CUSTOMER } from "../constants/index.js";

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email already exists"],
   },
   phoneNumber: {
      type: String,
   },
   firstName: {
      type: String,
   },
   lastName: {
      type: String,
   },
   phone: {
      type: String,
   },
   username: {
      type: String,
      required: [true, "Please enter username"],
      minlength: [6, "Username must be of minimum 6 characters"],
      unique: [true, "Username already exists"],
   },
   password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [6, "Password must be of minimum 6 characters"],
      select: false,
   },
   avatar: {
      type: String,
   },
   role: {
      type: String,
      default: ROLE_CUSTOMER,
      enum: [ROLE_ADMIN, ROLE_CUSTOMER],
   },
   resetPasswordToken: String,
   resetPasswordExpiry: Date,
});

userSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
   }
   next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};

userSchema.methods.getResetPasswordToken = async function () {
   const resetToken = crypto.randomBytes(20).toString("hex");

   this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
   this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

   return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
