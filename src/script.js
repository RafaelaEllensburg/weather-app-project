function formatDate(date) {
  let now = new Date();

  let currentHour = now.getHours();
  let currentMinutes = String(now.getMinutes()).padStart(2, "0");

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[dayIndex];

  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

// Homework

function showWeatherCondition(response) {
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#current-humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#current-wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "fab526fa46488b80d2e756d709629e24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}

function searchPosition(position) {
  let apiKey = "fab526fa46488b80d2e756d709629e24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocationbutton = document.querySelector("#get-current-location");
currentLocationbutton.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");
