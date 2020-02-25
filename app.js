const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to be be looked up",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(
      `Address: ${results.address}\nLatitude: ${results.latitude}\t|\tLongitude: ${results.longitude}`
    );
    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, resultz) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(
            `Summary: ${resultz.summary}.\tCurrent Temperature: ${resultz.currentTemp}, Feels like: ${resultz.feelTemp}.`
          );
        }
      }
    );
  }
});
