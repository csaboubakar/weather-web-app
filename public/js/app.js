var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var today = new Date();

let date = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const temp = document.querySelector("#temp");
const myLocation = document.querySelector("#myLocation");
const rain = document.querySelector("#rain");
const dateNow = document.querySelector("#dateNow");
const minTemp = document.querySelector("#minTemp");
const maxTemp = document.querySelector("#maxTemp");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  temp.textContent = "Loading...";
  myLocation.textContent = "";
  dateNow.textContent = "";
  minTemp.textContent = "";
  maxTemp.textContent = "";
  wind.textContent = "";
  humidity.textContent = "";
  rain.textContent = "";
  if (!location) {
    console.log("Provide valid location");
  } else {
    //http://localhost:3000
    fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOne.textContent = data.error;
        } else {
          myLocation.textContent = data.location;
          temp.textContent = `${data.temp} ℃ ${data.main}`;
          rain.textContent = `Perception: ${data.rain}%`;
          humidity.textContent = `Humidity: ${data.humidity}%`;
          minTemp.textContent = `Low: ${data.temp_min}℃`;
          maxTemp.textContent = `High: ${data.temp_max}℃`;
          wind.textContent = `Wind: ${data.wind}mph`;
          dateNow.textContent = `${date}`;
          console.log(data);
          console.log(data.location);
          console.log(data.temp);
          console.log(data.rain);
          console.log(data.humidity);
          console.log(data.temp_min);
          console.log(data.temp_max);
          console.log(data.wind);
          console.log(date);
        }
      });
    });
  }
});
