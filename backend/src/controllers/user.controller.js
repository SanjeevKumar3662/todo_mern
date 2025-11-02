import bcrypt from "bcrypt";
import { saltRounds } from "../constants.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (jwtPayload) => {
  try {
    return jwt.sign(jwtPayload, process.env.API_ACCESS_KEY, {
      expiresIn: "40s",
    });
  } catch (error) {
    console.error("JWT signing failed:", error);
    throw error;
  }
};

const generateRefreshToken = (jwtPayload) => {
  try {
    return jwt.sign(jwtPayload, process.env.API_REFRESH_KEY, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.error("JWT signing failed:", error);
    throw error;
  }
};

export const registerUser = async (req, res) => {
  // destructure username and password
  // encrypt it using bcrypt
  // user User model to create a user
  //add this password in user
  // send userid as rest

  try {
    const { username, email, fullname, password } = req.body;
    // console.log({ username, email, fullname, password });

    //checking if all fields are provided
    if (!(username && email && fullname && password)) {
      return res.status(400).json({
        message:
          "All fields incluing username, email, fullname, password are required",
      });
    }

    //validate password length
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        message: "Password length must be between 8 to 20 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { _id } = await User.create({
      username,
      fullname,
      email,
      password: hashedPassword,
    });

    //find user in db - this will return user without password field, select : true
    const user = await User.findById(_id);
    // console.log(user);

    res.status(201).json({
      // 201 code for created
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res
        .status(400)
        .json("Both username and password are required for login");
    }

    //check if user exists
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json("User not found / exist");
    }

    //compare/authenticate password
    const isPasswordVerified = await bcrypt.compare(password, user.password);
    if (!isPasswordVerified) {
      return res.status(401).json("Incorrect password");
    }

    // console.log(user, isPasswordVerified);
    const jwtPayload = { username, _id: user._id };
    const accessToken = generateAccessToken(jwtPayload); // no await, no res
    const refreshToken = generateRefreshToken(jwtPayload);

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true, // Prevents JavaScript access (more secure)
        secure: true, // Ensures cookies are sent over HTTPS only
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 15 * 60 * 1000, // Cookie expiration (15 minutes) for now 40s
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true, // Prevents JavaScript access (more secure)
        secure: true, // Ensures cookies are sent over HTTPS only
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration (30 days)
      })
      .json({ message: "loginIn successfull", accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    // Get refresh token from cookies
    const refreshTokenFromClient = req.cookies.refreshToken;
    if (!refreshTokenFromClient) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    // Check if the refresh token exists in the database
    const user = await User.findOne({ refreshToken: refreshTokenFromClient });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    //verify refresh token
    jwt.verify(
      refreshTokenFromClient,
      process.env.API_REFRESH_KEY,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid or expired token" });
        }

        // Check if the decoded user ID matches the database user ID
        if (user._id.toString() !== decoded._id) {
          return res.status(403).json({ message: "Invalid or expired token" });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken({
          username: decoded.username,
          _id: decoded._id,
        });

        // Send the new access token as a cookie
        return res
          .cookie("accessToken", newAccessToken, {
            httpOnly: true, // Prevents JavaScript access (more secure)
            secure: true, // Ensures cookies are sent over HTTPS only
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 15 * 60 * 1000, // Cookie expiration (15 minutes)
          })
          .status(200)
          .json({ message: "Access token refreshed successfully" });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
