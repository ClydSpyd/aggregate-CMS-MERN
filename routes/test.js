const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("TESTING World!");
});

router.get("/hello", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;