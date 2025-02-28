const fs = require("fs");
const path = require("path");

// Define the paths to the input and output files
const inputFile = path.join(__dirname, "cities500.json"); // Replace 'cities.json' with the actual filename
const outputFile = path.join(__dirname, "cities_extracted.json");

// Read the input JSON file
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const citiesData = JSON.parse(data);

    // Extract only the 'name' (city) and 'country' properties
    const extractedData = citiesData.map((city) => ({
      city: city.name,
      country: city.country,
    }));

    // Write the extracted data to a new JSON file
    fs.writeFile(
      outputFile,
      JSON.stringify(extractedData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing to the file:", err);
        } else {
          console.log("Data extracted and saved to", outputFile);
        }
      }
    );
  } catch (parseError) {
    console.error("Error parsing the JSON:", parseError);
  }
});
