const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

console.log("S3 client created");

// Set up multer for file uploads (store files in memory temporarily)
const multerInstance = multer({ storage: multer.memoryStorage() });

module.exports = { s3Client, multerInstance };
