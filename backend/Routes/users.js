const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { User } = require("../Models/user");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  const user = await User.findById(user_id);
  res.send(JSON.stringify(user));
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, isAdmin = false } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });

    await newUser.save();
    const token = newUser.generateAuthToken();

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      isAdmin: newUser.isAdmin
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "No user with that email" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = user.generateAuthToken();
    res.json({
      token: token,
      userId: user._id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
