const { default: mongoose } = require("mongoose");
const { connectDB } = require("../db");
const DynamicPageConfig = require("../schema/dynamicPageConfig");
require("dotenv").config();

(async function () {
  try {
    connectDB();

    const result = await DynamicPageConfig.updateMany(
      {},
      {
        $unset: { layout: 1 },
      },
      { strict: false }
    );
    console.log(`${result.modifiedCount} documents were updated`);
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
})();
