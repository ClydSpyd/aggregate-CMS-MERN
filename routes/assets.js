const express = require("express");
const router = express.Router();
const {
  S3Client,
  ListObjectsV2Command,
//   GetObjectCommand,
} = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// AWS S3 Configuration
const REGION = process.env.AWS_REGION
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const s3 = new S3Client({ region: REGION });

// Function to get S3 URLs
const getS3Urls = async (prefix) => {
  try {
    // List all objects in the bucket
    const listParams = {
      Bucket: BUCKET_NAME,
      ...(prefix && { Prefix: prefix }),
    };

    const command = new ListObjectsV2Command(listParams);
    const data = await s3.send(command);

    // Construct URLs for each item
    const urls = await Promise.all(
      data.Contents.map(async (item) => {
        // Public URL (if bucket is public)
        return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${item.Key}`;
      })
    );

    return urls;
  } catch (err) {
    console.error("Error fetching S3 URLs: ", err);
    throw err;
  }
};

// GET all items in bucket
router.get("/images/:folder", async (req, res) => {
  try {
    const { folder } = req.params;
    const prefix = folder !== "all" ? `${folder}/` : "";
    const urls = await getS3Urls(prefix);
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving images", error });
  }
});

// // GET all uploaded images
// router.get("/images/uploads", async (req, res) => {
//   try {
//     const urls = await getS3Urls("uploads/");
//     res.json(urls);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving images", error });
//   }
// });

// // GET all avatars
// router.get("/images/avatars", async (req, res) => {
//   try {
//     const urls = await getS3Urls("avatars/");
//     res.json(urls);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving images", error });
//   }
// });

module.exports = router;