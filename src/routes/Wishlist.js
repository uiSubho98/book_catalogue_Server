import Router from "express";
import { upload } from "../middlewares/multer.js";

import authenticateToken from "../middlewares/auth.js";
import { addWishList, getWishList, removeWishList } from "../controllers/Wishlist.js";

const wishlistRouter = Router();

wishlistRouter.route("/add/:id").post(authenticateToken, addWishList);
wishlistRouter.route("/delete/:id").delete(authenticateToken, removeWishList);
wishlistRouter.route("/").get(authenticateToken, getWishList);

export default wishlistRouter;
