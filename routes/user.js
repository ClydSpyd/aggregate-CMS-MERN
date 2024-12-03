const express = require("express");
const router = express.Router();

const {
  createNewUser,
  getUsers,
  generateAccessToken,
} = require("../services/user-service");

// @post
// REGISTER NEW USER
router.post("/register", async (req, res) => {
  // email + password + validate repeat pass + username + avatar
  const { username, email, password } = req.body;

  const messages = [];
  // check username not null
  if (!username) {
    messages.push("Username not provided");
  }

  // check if email and password are not null TODO: check if email with regex
  if (!email || !password) {
    messages.push("Email or password not provided");
  }

  // check username or email do not already exists
  const users = await getUsers();
  if (users.find((user) => user.username === username.toLowerCase())) {
    messages.push(`Username '${username.toLowerCase()}' already exists`);
  }

  if (users.find((user) => user.email === email.toLowerCase())) {
    messages.push(`Email '${email.toLowerCase()}' already exists`);
  }

  // return error if any
  if (messages.length > 0) {
    return res.status(400).json({ message: messages[0] });
  }

  // create new user
  const { newUser, error } = await createNewUser({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  // return error is any
  if (error) return res.status(500).json({error});

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
