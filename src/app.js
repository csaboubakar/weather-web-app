const path = require("path");

const hbs = require("hbs");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Aboubakar",
    src: "/img/me.jpg",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Aboubakar",
    email: "aboubakar@rabeltechnology.io",
  });
});

app.get("", (req, res) =>
  res.render("index", {
    title: "Weather",
    name: "Aboubakar",
  })
);

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!req.query.address) {
    return res.send({
      error: "You must provide location",
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      } else {
        forecast(
          latitude,
          longitude,
          (
            error,
            { temp, rain, humidity, main, temp_min, temp_max, wind } = {}
          ) => {
            if (error) {
              return res.send({
                error,
              });
            } else {
              res.send({
                location: location,
                temp: temp,
                rain: rain,
                address: address,
                humidity: humidity,
                main: main,
                temp_min: temp_min,
                temp_max: temp_max,
                wind: wind,
              });
            }
          }
        );
      }
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aboubakar",
    errorMessage: "Help Article Not Found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aboubakar",
    errorMessage: "Page Not Found.",
  });
});

app.listen(port, () => console.log(`Weather app listening on port ${port}!`));
