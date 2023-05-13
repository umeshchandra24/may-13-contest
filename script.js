// get DOM elements
const fetchDataBtn = document.querySelector('#fetch-data-btn');
const mapContainer = document.querySelector('#map');
const weatherDataContainer = document.querySelector('#weather-data');

// handle fetch data button click event
fetchDataBtn.addEventListener('click', async () => {
  try {
    // get current location using geolocation API
    const { coords } = await getCurrentLocation();
    const { latitude, longitude } = coords;

    // display map of current location
    const map = await displayMap(latitude, longitude, mapContainer);

    // get weather data using OpenWeatherMap API
    const weatherData = await getWeatherData(latitude, longitude);

    // display weather data
    displayWeatherData(weatherData, weatherDataContainer);
  } catch (error) {
    console.error(error);
  }
});

// function to get current location using geolocation API
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported by browser');
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
}

// function to display map of current location using Google Maps API
function displayMap(latitude, longitude, container) {
  return new Promise((resolve, reject) => {
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 8
    };
    const map = new google.maps.Map(container, mapOptions);
    resolve(map);
  });
}

// function to get weather data using OpenWeatherMap API
function getWeatherData(latitude, longitude) {
  const apiKey = 'AIzaSyDWpcDwc2ggAXcpSNThAyh4NyVfzglGXj0';
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => console.error(error));
}

// function to display weather data in container
function displayWeatherData(weatherData, container) {
  const currentWeather = weatherData.current.weather[0].description;
  const currentTemperature = weatherData.current.temp;
  const feelsLikeTemperature = weatherData.current.feels_like;
  const humidity = weatherData.current.humidity;
  const windSpeed = weatherData.current.wind_speed;
  const weatherHtml = `
    <h2>Current Weather: ${currentWeather}</h2>
    <p>Current Temperature: ${currentTemperature} &#8451;</p>
   
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    <p>Feels Like: ${feelsLikeTemperature} &#8451;</p>
  `;
  container.innerHTML = weatherHtml;
}
