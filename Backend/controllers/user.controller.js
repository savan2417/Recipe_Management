
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { generateRandomString } from "../utils/randomString.js";
import { sendMail } from "../utils/sendMail.js";
import bcrypt from "bcryptjs"; 



// Function to generate access token
const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();

        return { accessToken };

    } catch (error) {
        throw new ApiError(500, `Something went wrong while generating access token`);
    }
};



// Function for user registration
const registerUser = asyncHandler(async (req, resp) => {
  // Get data from frontend
  const { username, email, password } = req.body;

  // Validation
  if ([username, email, password].some((fields) => fields.trim() === "")) {
    throw new ApiError(400, `All fields are required`);
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, `User with email or username already exists`);
  }

  // Create user object
  const user = await User.create({
    username,
    email,
    password,
  });

  // Remove password and refresh token from response
  const createdUser = await User.findById(user._id).select("-password");

  // Return response
  return resp
    .status(201)
    .json(new ApiResponse(200, createdUser, `User Registered Successfully`));
});

// Function for user login
const loginUser = asyncHandler(async (req, resp) => {
  // Data from frontend
  const { email, password } = req.body;

  // Validation
  if (!email) {
    throw new ApiError(400, `Email is required`);
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, `User does not exist`);
  }

  // Password check
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, `Invalid Password`);
  }

  // Access token
  const { accessToken } = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  return resp.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        access_token: accessToken,
      },
      `User logged in successfully`
    )
  );
});

// Function for listing all users
const listAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, { _id: 0, password: 0 });

    res.status(200).json({
      message: "All Users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Function for forgot password
const forgotPassword = async (req, res) => {
  try {
    // Check if user exists in DB
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists && req.body.email !== "") {
      const tokenString = generateRandomString(20);
      const mailId = req.body.email;
      // Reset Link
      // const resetLink = `${process.env.RESET_LINK}?token=${tokenString}&email=${mailId}`;
      const resetLink = `https://netlify-kitchen-recipe-management.netlify.app/reset-password?token=${tokenString}&email=${mailId}`;

      const message = `<p>Hello ${userExists.username},</p>
              <p>
                You have requested to reset your password. Click the button below to
                reset it:
              </p>
              <a href="${resetLink}">
                <button style="padding: 10px; background-color: #000; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  Reset Your Password
                </button>
              </a>`;
      await sendMail(req.body.email, message);

      // Update the DB with Random string
      await User.updateOne(
        { email: req.body.email },
        { resetToken: tokenString }
      );

      // Status send
      res.status(201).send({
        message: "Reset Link sent to your email",
      });
    } else {
      res
        .status(400)
        .send({ message: `User ${req.body.email} does not exist` });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Function for reset password
const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword, token } = req.body;
    let user = await User.findOne({ email });
    if (user && user.resetToken === token) {
      const equalPassword = password === confirmPassword;
      if (equalPassword && password !== "" && confirmPassword !== "") {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update user password and remove resetToken
        await User.updateOne(
          { email },
          { password: hashedPassword, resetToken: null }
        );
        res.status(200).json({ message: "Password updated successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Password and confirm password do not match" });
      }
    } else {
      res.status(400).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, listAllUsers, forgotPassword, resetPassword };
