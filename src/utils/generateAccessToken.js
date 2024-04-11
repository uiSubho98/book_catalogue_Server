import { User } from "../models/Users.js";
import ApiError from "./ApiError.js";

const generate_Access_Token = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log({ user });
    if (!user) {
      // Handle the case when user is null
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    // Handle other errors
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export default generate_Access_Token;
