// user.controller.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";

const register = async (req, res) => {
  try {
    console.log(req.body); // Debug: log the request body

    // Validate input
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json("Missing required fields!");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      passwordHash: hashedPassword,
      accountType: req.body.accountType,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Save user and respond
    const user = await newUser.save();
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err); // Debug: log the error
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    // Check user email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (!validPassword) {
      return res.status(400).json("Wrong password!");
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token and user info
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { register, login };
