const request = require("request");

const apikey = ''; // Edit me

const geocodeAddress = (address, callback) => {
  let addy = "";
  addy = encodeURIComponent(address);
  request(
    {
      url: `https://dev.virtualearth.net/REST/v1/Locations?query=${addy}&maxResults=1&key=${apikey}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("[ERROR] Unable to connect to API");
      } else if (body.statusCode != 200) {
        callback(`[ERROR] ${body.errorDetails[0]}`);
      } else {
        if (body.resourceSets[0].estimatedTotal > 0) {
          callback(undefined, {
            address: body.resourceSets[0].resources[0].name,
            latitude: body.resourceSets[0].resources[0].point.coordinates[0],
            longitude: body.resourceSets[0].resources[0].point.coordinates[1]
          });
        } else {
          callback(
            "[ERROR] No results found for this address/The address is invalid."
          );
        }
      }
    }
  );
};

module.exports = {
  geocodeAddress
};
