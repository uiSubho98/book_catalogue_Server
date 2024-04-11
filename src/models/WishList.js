import { Schema, model } from "mongoose";

const wishlistSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book", // Reference to the Book model
      required: true,
    },
  },
  { timestamps: true }
);

export const Wishlist = model("Wishlist", wishlistSchema);
