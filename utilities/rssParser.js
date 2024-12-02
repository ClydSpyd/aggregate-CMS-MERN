const axios = require("axios");
const xml2js = require("xml2js");

async function fetchRSSFeed(url) {
  try {
    // Fetch the RSS feed
    const response = await axios.get(url);

    // Parse the XML feed with a promise
    const parser = new xml2js.Parser();

    const result = await parser.parseStringPromise(response.data);

    // extract the 'item' array from the result
    const items = result.rss?.channel[0]?.item;

    if (items) {
      return { data: items }; // Return only the extracted items
    } else {
      console.log("No items found in RSS feed.");
      return { error: "No items found in RSS feed" };
    }
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return { error: error.message }; // Return the error message in case of an error
  }
}

module.exports = fetchRSSFeed;
