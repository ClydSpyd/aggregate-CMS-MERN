const { default: mongoose } = require("mongoose");
const { connectDB } = require("../db");
const DynamicPageConfig = require("../schema/dynamicPageConfig");
const userAdmin = require("../schema/user-admin");
require("dotenv").config();

(async function () {
  try {
    connectDB();

    const result = await userAdmin.updateMany({
      lastLogin: null,
    });
    console.log(`${result.modifiedCount} documents were updated`);
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
})();
