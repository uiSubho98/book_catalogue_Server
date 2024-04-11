import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]?.replace("Bearer ", " ");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    throw new ApiError("403", "Token required");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) {
      throw new ApiError("403", "Unauthorized Acess");
    }

    req.user = user;

    next();
  });
}
export default authenticateToken;
