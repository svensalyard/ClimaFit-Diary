// Elements
var searchForm = document.querySelector('.weatherform');
let weatherIcon = $(".weathericon");
// Search button for weather
const weatherButton = document.querySelector(".search-weather");

// Event Listener for Form Submission
weatherButton.addEventListener('click', async function (e) {

    try {
        e.preventDefault();
        var lat;
        var lon; 
        var temp;
        var city = document.getElementById('weathersearch').value;
        var response = await fetch("/api/weatherkey")
        var apiKey = await response.json();
        console.log(apiKey)
        var locationurl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
      // Location Call
      // Api Call to get the location data from the city that is searched
        var response = await fetch(locationurl);
        var data = await response.json();
        console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;

        // Current conditions call
        // Takes the coordinates from previous request and passes them in to g
        const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        response = await fetch(weatherurl);
        var weatherData = await response.json();
        console.log(weatherData)
        var weatherdisplay = weatherData

        // Parses the condition description, temperatures, and icon code
        display = document.querySelector('.weathercard').textContent = weatherdisplay.weather[0].description;
        temp = document.querySelector('.temperature').textContent = weatherdisplay.main.temp;
        iconcode = weatherdisplay.weather[0].icon;
        // Displays the icon depending the icon code from openweathermaps
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}@2x.png`;

        icondisplay = document.querySelector('.weathericon').src = iconurl;
        
    } catch (err) {
        console.log(err);
    }
});