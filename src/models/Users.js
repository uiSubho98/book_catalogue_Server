import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});
userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    name: this.name,
    email: this.email,
  };
  const secret = `${process.env.ACCESS_TOKEN_SECRET}`;
  const options = { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}` };

  return jwt.sign(payload, secret, options);
};
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // Handle errors

    throw new ApiError(500, "Something went wrong while comparing passwords");
  }
};

export const User = model("User", userSchema);
