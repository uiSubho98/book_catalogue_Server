import { Wishlist } from "../models/WishList.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import mongoose from "mongoose";

const addWishList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("401", "Book id not provided");
  }
  const bookId = mongoose.Types.ObjectId.createFromHexString(id);
  const authorId = mongoose.Types.ObjectId.createFromHexString(req.user._id);
  const wishlistItem = await Wishlist.findOne({ authorId, bookId });
  if (wishlistItem) {
    throw new ApiError("401", "Book already wishlisted");
  }
  const addWishList = await Wishlist.create({
    bookId,
    authorId,
  });
  if (!addWishList) {
    throw new ApiError("401", "Something went wrong");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, addWishList, "Added into Wishlist"));
});

const removeWishList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("401", "Book id not provided");
  }
  const bookId = mongoose.Types.ObjectId.createFromHexString(id);
  const authorId = mongoose.Types.ObjectId.createFromHexString(req.user._id);
  const wishlistItem = await Wishlist.findOne({ authorId, bookId });
  if (!wishlistItem) {
    throw new ApiError("401", "Book is not available");
  }

  const deleteItem = await Wishlist.deleteOne({ bookId });
  if (deleteItem.deletedCount <= 0) {
    throw new ApiError(404, "Book can't be deleted");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Book removed from wishlist"));
});

const getWishList = asyncHandler(async (req, res) => {
  const wishlistItems = await Wishlist.find({ });
  return res
    .status(201)
    .json(new ApiResponse(200, wishlistItems, "Book removed from wishlist"));
});

export { addWishList, removeWishList,getWishList };
