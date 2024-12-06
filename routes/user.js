const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const {
  createNewUser,
  getUsers,
  generateAccessToken,
} = require("../services/user-service");

// @post
// REGISTER NEW USER
router.post("/register",[
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("avatarUrl").notEmpty().withMessage("AvatarURL is required"),
], async (req, res) => {

  console.log("ADD USER");
  console.log(req.body);
  const errors = validationResult(req);

  console.log({ errors });
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => err.msg),
    });
  }

  // email + password + validate repeat pass + username + avatar
  const { username, email, password, role, avatarUrl } = req.body;

  // check username or email do not already exists
  const users = await getUsers();
  if (users.find((user) => user.username === username.toLowerCase())) {
    messages.push(`Username '${username.toLowerCase()}' already exists`);
  }

  if (users.find((user) => user.email === email.toLowerCase())) {
    messages.push(`Email '${email.toLowerCase()}' already exists`);
  }

  // create new user
  const { newUser, error } = await createNewUser({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
    avatarUrl,
  });

  // return error is any
  if (error) return res.status(500).json({ helloworld: error });

  const token = generateAccessToken(newUser);

  res.status(201).json({ token });
});

// @get
// FETCH ALL USERS
router.get("/all", async (req, res) => {
  const users = await getUsers();
  // delete password attribute
  users.forEach((user) => delete user.password);
  res.status(200).json(users);
});

module.exports = router;
