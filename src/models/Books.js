import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pub_date: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  poster: {
    type: String, // Store the URL of the image
    required: true,
  },
});

export const Book = model("Book", bookSchema);
