const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./db');
const testRoutes = require('./routes/test');
const rssRoutes = require('./routes/rss-data');
const articleRoutes = require('./routes/article');
const uploadRoutes = require('./routes/upload');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 6969;

app.use(cors());
app.use(express.json());

console.log("starting server...");

connectDB();

app.use("/api/test", testRoutes);
app.use("/api/rss", rssRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

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