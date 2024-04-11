import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/Users.js";
import generate_Access_Token from "../utils/generateAccessToken.js";

function findMissingField(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      return key;
    }
  }
  return null;
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const missingField = findMissingField({
    name,
    email,
    password,
  });

  console.log(name.trim());
  console.log(email.trim());
  console.log(password.trim());

  if ([name, email, password].some((elem) => elem.trim() === "")) {
    throw new ApiError(400, "All fields are required with non-empty value");
  }

  if (missingField) {
    throw new ApiError(400, `Field '${missingField}' is required`);
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError(400, `This email already exists`);
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });
  console.log({ newUser });
  const createdUser = await User.findById(newUser._id).select("-password ");
  console.log({ createdUser });
  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while creating new user");
  }
  res.status(200).json(new ApiResponse(200, createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((elem) => elem.trim === "")) {
    throw new ApiError(400, "All fields are required with non-empty value");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid Credentials");
  }
//   const isPassValid = await user.comparePassword(password);
//   if (!isPassValid) {
//     throw new ApiError(400, "Invalid Password");
//     }
  const { accessToken } = await generate_Access_Token(user?._id);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: user, accessToken },
        "user Login Successfuly"
      )
    );
});

export { registerUser,loginUser };
