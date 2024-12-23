const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./db');
require('dotenv').config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 6969;

app.use(cors());
app.use(express.json());

console.log("starting server...");

connectDB();

// admin routes (for CMS)
app.use("/api/test", require('./routes/test'));
app.use("/api/rss", require('./routes/rss-data'));
app.use("/api/article", require('./routes/article'));
app.use("/api/upload", require('./routes/upload'));
app.use("/api/user/admin", require('./routes/user-admin'));
app.use("/api/user/client", require('./routes/user-client'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/utility", require('./routes/utility'));
app.use("/api/config", require('./routes/config'));
app.use("/api/page", require('./routes/page'));

// client-facing routes (for main site)
app.use("/api/client/config", require('./routes/client/config'));
app.use("/api/client/page", require('./routes/client/pages'));

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'client/build')));


app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "main.html"));
});

// Catch-all route to serve the React app's index.html for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});