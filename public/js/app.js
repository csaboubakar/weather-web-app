var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var today = new Date();

let date = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

fetch("http://localhost:3000/weather?address=Lahore").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.temp);
      console.log(data.rain);
      console.log(data.rain);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");
const msgThree = document.querySelector("#message-3");
const msgFour = document.querySelector("#message-4");
const msgFive = document.querySelector("#message-5");
const msgSix = document.querySelector("#message-6");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  msgThree.textContent = "";
  msgFour.textContent = "";
  msgFive.textContent = "";
  msgSix.textContent = "";
  if (!location) {
    console.log("Provide valid location");
  } else {
    //http://localhost:3000
    fetch(`http://localhost:3000/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            msgOne.textContent = data.error;
          } else {
            msgOne.textContent = data.location;
            msgTwo.textContent = `${data.temp} ℃ ${data.main}`;
            msgThree.textContent = `Perception: ${data.rain}%`;
            msgFour.textContent = `Humidity: ${data.humidity}%`;
            msgSix.textContent = `${date}`;

            console.log(data.location);
            console.log(data.temp);
            console.log(data.rain);
            console.log(data.humidity);
            console.log(data.main);
            console.log(date);
          }
        });
      }
    );
  }
});
