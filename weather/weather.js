const request = require("request");

const apikey = ''; // Edit me

const getWeather = (lat, long, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${apikey}/${lat},${long}?units=auto`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(undefined, {
          summary: body.currently.summary,
          currentTemp: body.currently.temperature,
          feelTemp: body.currently.apparentTemperature,
        });
      } else {
        callback("Unable to connect to Forecast.io");
      }
    }
  );
};

module.exports = {
  getWeather
};
