function getWeather(){
  const apiKey = '';
  const city = document.getElementById('city').value;

  if (!city) {
    alert('Please enter a city');
    return
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;
 
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=imperial`;

  fetch(currentWeatherUrl)
  .then(response => response.json())
  .then(data => {
    displayWeather(data);
  })
  .catch(error => {
    console.error('Error fetching current weather data: ', error);
    alert('Error fetching current weather data. Please try again.');
  });

  fetch(forecastUrl)
  .then(response => response.json())
  .then(data => {
    displayHourlyForecast(data.list);
  })
  .catch(error => {
    console.error('Error fetching hourly forecast data: ', error);
    alert('Error fetching hourly forecast data. Please try again.');
  });

} 



function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const humidityDiv = document.getElementById('humidity');
  const windDiv = document.getElementById('wind');

  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';
  humidityDiv.innerHTML = '';
  windDiv.innerHTML = '';

if(data.cod === '404') {
  weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
} else {
  const cityName = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const humid = data.main.humidity + "%";
  const wind = Math.round(data.wind.speed) + "mph";

  const temperatureHTML = `
  <p>${temperature} \u00B0F</p>
  `;

  const weatherHtml = `
  <p>${cityName}</p>
  <p>${description}</p>
  `;

  const humidityHtml = `
  <div class="row">
    <div class="box" id="box1">
      <img src="images/humidity.png">
      <p>${humid} Humidity </p>
    </div>
    <div class="box" id="box2">
      <img src="images/wind.png">
      <p>${wind} Wind Speed </p>
    </div>
  </div>
  `;


//<img src="images/humidity.png" style="width: 10px, height: 10px;">
//<p>${humid} Humidity </p>



//p style="display:inline-block;">
//<img src="images/humidity.png" style="width: 10px, height: 10px;">
//${humid} Humidity
//</p>


  tempDivInfo.innerHTML = temperatureHTML;
  weatherInfoDiv.innerHTML = weatherHtml;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = description;
  humidityDiv.innerHTML = humidityHtml;

  showImage();
  }
}



function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach(item => {

    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
    <div class="hourly-item">
      <span>${hour}:00</span>
      <img src="${iconUrl}" alt="Hourly Weather Icon">
      <span>${temperature} \u00B0F</span>
    </div>
    `;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;

  });
}



function showImage() {
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block';
}
