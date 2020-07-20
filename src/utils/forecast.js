const request = require("request");

const forecast = (lat, lan, callback) => {
  const loacation = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&units=metric&APPID=56c6e24c4db497fcd5ab405932f5216b`;

  request({ url: loacation, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weather service!", undefined);
    } else if (response.body.message) {
      callback("Unable to find location!", undefined);
    } else {
      callback(undefined, {
        temp: response.body.main.temp,
        temp_min: response.body.main.temp_min,
        temp_max: response.body.main.temp_max,
        humidity: response.body.main.humidity,
        wind: response.body.wind.speed,
        rain: response.body.clouds.all,
        main: response.body.weather[0].main,
      });
    }
  });
};

module.exports = forecast;
