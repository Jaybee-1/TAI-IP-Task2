// OpenWeatherMap API key
const apiKey = "3faa8a8414a4e4d654e320f49d919b6d";

// DOM Elements
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const loadingBtn = document.getElementById("loading-btn")
const weatherResult = document.getElementById("weather-result");
let loading = false

// Event listener for button click
getWeatherBtn.addEventListener("click", fetchWeather);

// Function to fetch weather data from OpenWeatherMap API
function fetchWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  loading = true

  if (loading) {
    loadingBtn.style = 'display:block'
    getWeatherBtn.style  = 'display:none'
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&id=524901&appid=3faa8a8414a4e4d654e320f49d919b6d`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      loading = false
      return response.json();
    })
    .then((data) => {
        if (!loading) {
            loadingBtn.style = 'display:none'
            getWeatherBtn.style  = 'display:block'
          }
        console.log('weather-data', data)
      displayWeather(data)
    })
    .catch((error) => {
      weatherResult.innerHTML = `<p>${error.message}</p>`;
    });
}

// Function to display weather data
function displayWeather(data) {
  const temp = data.main.temp;
  const weather = data.weather[0].description;
  const icon = data.weather[0].icon;
  const city = data.name;
  const country = data.sys.country;

  weatherResult.innerHTML = `
        <p><strong>${city}, ${country}</strong></p>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${weather}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
        `;
}
