document.querySelector("h2").textContent = "Welcome to Raife's Computer Blog!";

document.querySelector("img").addEventListener("click", function() {
    alert("You clicked the computer image!");
});

console.log("JavaScript is working!");

// grabbing weather data
async function getWeatherData(latitude, longitude) {
    const apiKey = "ac32bc500c062925bd60b70aad92e135";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`; // Use metric units
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        displayWeather(data);
      } else {
        console.error("Weather data fetch failed:", data);
        displayError("Could not retrieve weather data.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      displayError("An error occurred while fetching weather data.");
    }
  }
  
  // display weather data
  function displayWeather(data) {
    const weatherDiv = document.getElementById("weather");
    if (!weatherDiv) return; // Exit if the element does not exist.
  
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
    weatherDiv.innerHTML = `
      <h2>Weather in ${cityName}</h2>
      <p>Temperature: ${temperature}°C</p>
      <p>Description: ${description}</p>
      <img src="${iconUrl}" alt="${description}">
    `;
  }
  
  function displayError(message){
    const weatherDiv = document.getElementById("weather");
    if (!weatherDiv) return;
  
    weatherDiv.innerHTML = `<p>${message}</p>`;
  }
  
  // get user location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          displayError("Location access denied or unavailable.");
        }
      );
    } else {
      displayError("Geolocation is not supported by this browser.");
    }
  }
  
  // getLocation when the page loads
  window.onload = getLocation;