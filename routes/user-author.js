const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const {
  getAuthors,
  createNewAuthor,
} = require("../services/user-service");
const ClientUser = require("../schema/user-client");
const userAuthor = require("../schema/user-author");

// @post
// REGISTER NEW AUTHOR
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Username is required"),
    body("location").notEmpty().withMessage("Email is required"),
    body("avatarUrl").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    console.log("ADD AUTHOR USER");
    console.log(req.body);
    const errors = validationResult(req);

    console.log({ errors });
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
      });
    }

    // email + password + validate repeat pass + username
    const { name, location, avatarUrl } = req.body;

    // check username or email do not already exists
    const authors = await getAuthors();
    if (authors.find((user) => user.name === name.toLowerCase())) {
      messages.push(`Username '${name.toLowerCase()}' already exists`);
    }

    // create new user
    const { newUser, error } = await createNewAuthor({
      name,
      location,
      avatarUrl,
    });

    // return error is any
    if (error) return res.status(500).json({ helloworld: error });

    res.status(201).json(newUser);
  }
);

// @PATCH
// UPDATE AUTHOR
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await userAuthor.findByIdAndUpdate(
    id,
    { $set: req.body }, // update only the provided fields
    { new: true, runValidators: true } // new: true returns the updated document
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
}
);

// @DELETE
// DELETE AUTHOR
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userAuthor.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @GET
// FETCH ALL USERS
router.get("/all", async (req, res) => {
  const users = await getAuthors();
  res.status(200).json(users);
});

module.exports = router;
