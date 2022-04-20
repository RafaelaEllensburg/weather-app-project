function formatDate(timestamp) {
  let now = new Date(timestamp);
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let dayIndex = now.getDay();
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
  let currentCity = document.querySelector("#current-location");
  let currentDate = document.querySelector("#current-date");
  let currentDescription = document.querySelector("#current-description");
  let currentTemperature = document.querySelector("#current-temperature");
  let currentIcon = document.querySelector("#current-weather-icon");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentDate.innerHTML = `Updated: ${formatDate(response.data.dt * 1000)}`;
  currentDescription.innerHTML = response.data.weather[0].main;
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  currentIcon.setAttribute(
    "src",
    `/images/${response.data.weather[0].icon}.svg`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}

// Search engine & API integration

function searchCity(city) {
  let apiKey = "fab526fa46488b80d2e756d709629e24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input");
  searchCity(city.value);
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

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocationbutton = document.querySelector("#get-current-location");
currentLocationbutton.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");

// Unit conversion

function toggleTemperatureCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;

  celsiusToggle.classList.add("active", "btn-primary");
  fahrenheitToggle.classList.remove("active", "btn-primary");
}

function toggleTemperatureFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;

  celsiusToggle.classList.remove("active", "btn-primary");
  fahrenheitToggle.classList.add("active", "btn-primary");
}

let celsiusTemperature = null;

let celsiusToggle = document.querySelector("#celsius-toggle");
celsiusToggle.addEventListener("click", toggleTemperatureCelsius);

let fahrenheitToggle = document.querySelector("#fahrenheit-toggle");
fahrenheitToggle.addEventListener("click", toggleTemperatureFahrenheit);
