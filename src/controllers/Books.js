import { Book } from "../models/Books.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/Users.js";
import mongoose from "mongoose";

const addBooks = asyncHandler(async (req, res) => {
  const { title, genre, pub_date, price } = req.body;

  console.log(req.user);
  if ([title, genre, pub_date, price].some((elem) => elem.trim() === "")) {
    throw new ApiError(400, "All fields are required with non-empty value");
  }
  if (!req.files || !req.files.poster) {
    throw new ApiError(400, "Book Thumbnail is required");
  }
  const bookAuthor = await User.findOne({ email: req.user.email });

  const bookPosterLocalPath = req.files?.poster[0]?.path;
  //   console.log({ title, author, genre, pub_Date, price });
  //   console.log({ bookPosterLocalPath });
  const bookThumbnail = await uploadOnCloudinary(bookPosterLocalPath);
  if (!bookThumbnail) {
    throw new ApiError(400, "Something went wrong uploading");
  }
  const book = await Book.create({
    title,
    author: bookAuthor.name,
    price,
    genre,
    pub_date,
    poster: bookThumbnail.url,
  });
  const lastCreatedBook = await Book.findById(book._id);
  //   console.log({ lastCreatedBook });
  if (!lastCreatedBook) {
    throw new ApiError(500, "Something went wrong while registering Book ");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, lastCreatedBook, "Book added successfully"));
});

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  return res
    .status(201)
    .json(new ApiResponse("200", books, "All books fetched successfully"));
});

const editBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { price, title, pub_date, genre } = req.body;
  console.log(id);
  const bookId = mongoose.Types.ObjectId.createFromHexString(id);
  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId },
    { price, title, pub_date, genre },
    { new: true }
  ).lean();
  if (!updatedBook) {
    throw new ApiError(404, "Book not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedBook, "Book updated successfully"));
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bookId = mongoose.Types.ObjectId.createFromHexString(id);
  const deleteBook = await Book.deleteOne(bookId);
  if (deleteBook.deletedCount <= 0) {
    throw new ApiError(404, "Book can't be deleted");
  }
  return res.status(201).json(new ApiResponse(200, {}, "Book deleted"));
});

export { addBooks, getAllBooks, editBook, deleteBook };
