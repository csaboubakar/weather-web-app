const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaWFib3ViYWthciIsImEiOiJja2Nsajg5Z2cyNXR6MnpwYmZreXd6dG9oIn0.qBMRJLWnJkbkX3S7r8Um5g`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect geo location service!", undefined);
    } else if (body.message) {
      callback("No location provided", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location! Try another location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
