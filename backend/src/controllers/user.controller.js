import bcrypt from "bcrypt";
import { saltRounds } from "../constants.js";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  // destructure username and password
  // encrypt it using bcrypt
  // user User model to create a user
  //add this password in user
  // send userid as rest

  try {
    const { username, email, fullname, password } = req.body;
    console.log({ username, email, fullname, password });

    //checking if all fields are provided
    if (!(username && email && fullname && password)) {
      res.status(400).json({
        message:
          "All fields incluing username, email, fullname, password are required",
      });
    }

    //validate password length
    if (password.length < 8 || password.length > 20) {
      res.status(400).json({
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

    const user = await User.findById(_id);
    // console.log(user);

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
