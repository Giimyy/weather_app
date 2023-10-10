"use strict";

const apiKey = "4957494bb2b5a81b9d39e94e1a7605c1";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const checkWeather = async function (city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    const weather = data.weather[0].main.toLowerCase();
    if (weather) {
      weatherIcon.src = `images/${weather}.png`;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
};

searchBtn.addEventListener("click", searchWeather);
searchBox.addEventListener("keypress", (e) => {
  e.preventDefault;
  if (e.key === "Enter") {
    searchWeather();
  }
});

function searchWeather() {
  checkWeather(searchBox.value);
  searchBox.value = "";
}
