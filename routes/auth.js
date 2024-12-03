const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {
  findUserByUsername,
  findUserByEmailWithPassword,
  generateAccessToken,
} = require("../services/user-service");

// @post
// LOGIN USER
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (username == null)
    return res.status(400).json({ message: "Username must be provided" });

  let user = null;

  user = await findUserByUsername(username.toLowerCase());

  if (user == null) {
    return res.status(404).json({ message: "User or password incorrect" });
  }

  // validate password
  try {
    const userWithPass = await findUserByEmailWithPassword(user);
    if (await bcrypt.compare(password, userWithPass.password)) {
      const token = generateAccessToken(user);
      res
        .status(200)
        .cookie("authToken", token, {
          // httpOnly: true, // Prevent JavaScript access
          secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
          sameSite: "strict", // CSRF protection
          maxAge: 3 * 60 * 1000, // 15 minutes
        })
        .json({ token, user: { id: user.id, username: user.username } });
    } else {
      res.status(400).json({ message: "User or password incorrect" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong when validating password." });
  }
});

router.post("/verify-token", async (req, res) => {
  const { token } = req.body;

  if (token == null) return res.status(400).json({ message: "Token required" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log(decoded);

    //  LOG TOKEN EXPIRY
    const expiryDate = new Date(decoded.exp * 1000);
    console.log(`NOW: ${new Date().toISOString()}`);
    console.log(`Token expires at: ${expiryDate.toISOString()}`);

    res.status(200).json({ id: decoded.id, username: decoded.username });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
