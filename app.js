import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.js";
import { BASE_URL } from "./src/constant.js";
import bookRouter from "./src/routes/Books.js";
import wishlistRouter from "./src/routes/Wishlist.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to Book Catalogue");
});

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/book`, bookRouter);
app.use(`${BASE_URL}/wishlist`, wishlistRouter);

export default app;
