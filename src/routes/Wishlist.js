import Router from "express";
import { upload } from "../middlewares/multer.js";

import authenticateToken from "../middlewares/auth.js";
import { addWishList, removeWishList } from "../controllers/Wishlist.js";

const wishlistRouter = Router();

wishlistRouter.route("/add/:id").post(authenticateToken, addWishList);
wishlistRouter.route("/delete/:id").delete(authenticateToken, removeWishList);

export default wishlistRouter;
