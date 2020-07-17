console.log("Client side JS");

// fetch("http://localhost:3000/weather?address=Lahore").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.temp);
//       console.log(data.rain);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");
const msgThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  msgThree.textContent = "";

  if (!location) {
    console.log("Provide valid location");
  } else {
    fetch(`http://localhost:3000/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            msgOne.textContent = data.error;
          } else {
            msgOne.textContent = data.location;
            msgTwo.textContent = `Temperature is \n ${data.temp} ℃`;
            msgThree.textContent = `Chance of Rain\n ${data.rain}%`;
            console.log(data.location);
            console.log(data.temp);
            console.log(data.rain);
          }
        });
      }
    );
  }
});
