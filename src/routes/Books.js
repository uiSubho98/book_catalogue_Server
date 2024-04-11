import Router from "express";
import { upload } from "../middlewares/multer.js";
import { addBooks, getAllBooks,editBook,deleteBook } from "../controllers/Books.js";
import authenticateToken from "../middlewares/auth.js";

const bookRouter = Router();

bookRouter.route("/addBooks").post(
  upload.fields([
    {
      name: "poster",
      maxCount: 1,
    },
  ]),
  authenticateToken,
  addBooks
);

bookRouter.route("/allBooks").get(authenticateToken, getAllBooks);
bookRouter.route("/edit/:id").put(authenticateToken, editBook);
bookRouter.route("/delete/:id").delete(authenticateToken, deleteBook);

export default bookRouter;
