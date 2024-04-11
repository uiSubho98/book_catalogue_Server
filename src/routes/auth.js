import Router from "express";
import { loginUser, registerUser } from "../controllers/Auth.js";

const authRouter = Router();

authRouter.route("/signup").post(registerUser);
authRouter.route("/signin").post(loginUser);


export default authRouter;