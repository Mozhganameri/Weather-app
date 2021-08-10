function formatDate(timestamp) {
  let date = new Date(timestamp);
  let Day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = Day[date.getDay()];
  let month = Month[date.getMonth()];
  let monthDay = date.getDate();
  return `${day}, ${month} ${monthDay}`;
}
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours} : ${minutes}`;
}

function dayItem(timestamp) {
    let date = new Date( timestamp * 1000)
    let day = date.getDay()
    let Day = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];
    return Day[day]
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay , index) {
      if (index < 5) {
          
          forecastHTML =
          forecastHTML +
          `
          <div class="col nextFiveDays">
          <div>${dayItem(forecastDay.dt)}</div>
          <div>
          <img src="${chooseIcon(
              forecastDay.weather[0].icon
              )}" alt="condition" class="nextDaysImg conditionImg">
              </div>
              <div>${Math.round(forecastDay.temp.day)}°C</div>
              </div>`;
          }
            });
            
            forecastElement.innerHTML = forecastHTML;
        
}

function chooseIcon(icon) {
    console.log(icon);
  switch (icon) {
    case "01d":
    case "01n":
      return "./images/01.jpg";
      break;
    case "02d":
    case "02n":
      return "./images/02.jpg";
      break;
    case "03d":
    case "03n":
    case "04n":
    case "04d":
      return "./images/03.jpg";
      break;
    case "09d":
    case "09n":
      return "./images/05.jpg";
      break;
    case "10d":
    case "10n":
      return "./images/05.jpg";
      break;
    case "11d":
    case "11n":
      return "./images/06.jpg";
      break;
    case "13d":
    case "13n":
      return "./images/06.jpg";
      break;
    default:
      return "./images/01.jpg";
      break;
  }
}
function getForecast(coordinates) {
  console.log("here2");
  console.log(coordinates);
  let apiKey = "ff992df60e8c388664e8c387bf3c174c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#selectedCity");
  let temperatureElement = document.querySelector("#currentTemp");
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  getForecast(response.data.coord);
  document.querySelector(".mainIcon").setAttribute("src",chooseIcon(response.data.weather[0].icon));
}

function search(city) {
  let apiKey = "ff992df60e8c388664e8c387bf3c174c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function inputCity(e) {
  if (e.key === "Enter") {
    let city = document.querySelector("#cityBox");
    let selectedCity = document.querySelector("#selectedCity");
    selectedCity.innerHTML = city.value;
    search(city.value);
  }
}

search("Tehran");
let form = document.querySelector("#cityBox");
form.addEventListener("keypress", inputCity);
