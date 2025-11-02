import bcrypt from "bcrypt";
import { saltRounds } from "../constants.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (jwtPlayload) => {
  try {
    return jwt.sign(jwtPlayload, process.env.API_ACCESS_KEY);
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
    const jwtPlayload = { username, mongo_id: user._id };
    const accessToken = generateAccessToken(jwtPlayload); // no await, no res

    return res
      .status(200)
      .json({ message: "loginIn successfull", accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
