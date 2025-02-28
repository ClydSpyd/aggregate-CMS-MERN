const fs = require('fs');
const path = require('path');

// Define the paths to the input files
const citiesFile = path.join(__dirname, 'cities.json');  // Your existing city data
const countriesFile = path.join(__dirname, 'countries-iso2.json'); // The countries-iso2 mapping

// Define the output file path
const outputFile = path.join(__dirname, 'cities_with_country_names.json');

// Read the countries ISO2 to country name mapping
fs.readFile(countriesFile, 'utf8', (err, countriesData) => {
  if (err) {
    console.error('Error reading countries file:', err);
    return;
  }

  // Parse the countries ISO2 mapping
  const countries = JSON.parse(countriesData);

  // Read the cities extracted file
  fs.readFile(citiesFile, 'utf8', (err, citiesData) => {
    if (err) {
      console.error('Error reading cities file:', err);
      return;
    }

    try {
      // Parse the cities data
      const cities = JSON.parse(citiesData);

      // Map through the cities and replace the country code with country name
      const citiesWithCountryNames = cities.map(city => {
        const countryName = countries[city.country];
        return {
          city: city.city,
          country: countryName || city.country // Fallback to the code if no country is found
        };
      });

      // Write the updated data to a new file
      fs.writeFile(outputFile, JSON.stringify(citiesWithCountryNames, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to the file:', err);
        } else {
          console.log('Updated cities data saved to', outputFile);
        }
      });

    } catch (parseError) {
      console.error('Error parsing the cities data:', parseError);
    }
  });
});
