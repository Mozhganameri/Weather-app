function formatDate(timestamp){
    let date = new Date(timestamp)
    let Day = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"]
    let Month = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]
    let day = Day[date.getDay()]
    let month = Month[date.getMonth()]
    let monthDay = date.getDate()
    return `${day}, ${month} ${monthDay}`
}
function formatTime(timestamp){
    let date = new Date(timestamp)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return `${hours} : ${minutes}`
}

function displayForecast(response) {
    let forecast = response.data.daily
    let forecastElement = document.querySelector("#forecast")
    let forecastHTML = "" ;
    forecast.forEach(function(forecastDay){
        console.log(forecastDay.weather[0].icon)
        let icon = iconSelect(forecastDay.weather[0].icon) 
console.log(icon)
        forecastHTML = forecastHTML + 
        `
        <div class="col nextFiveDays">
        <div>${forecastDay.dt}</div>
        <div>
        <img src="" alt="condition" class="nextDaysImg conditionImg">
        </div>
        <div>${forecastDay.temp.day}°C</div>
      </div>`
      
    })
    
    forecastElement.innerHTML = forecastHTML
}

function getForecast(coordinates) {
    let apiKey = "ff992df60e8c388664e8c387bf3c174c"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)
}
function iconSelect(iconCode) {
    let icon = document.querySelectorAll(".conditionImg")

    switch (iconCode) {
        case "01d":
            case "01n":
                icon.setAttribute("src" ,"./images/01.jpg")
                break;
                case "02d":
                    case "02n":
        icon.setAttribute("src" ,"./images/02.jpg")
        break;
        case "03d":
            case "03n":
                case "04n":
                    case "04d":
                        icon.setAttribute("src" ,"./images/03.jpg")
                        break;
                        case "09d":
                            case "09n":
                                icon.setAttribute("src" ,"./images/05.jpg")
                                break;
        case "10d":
            case "10n":
                icon.setAttribute("src" ,"./images/05.jpg")
                break;
                case "11d":
                    case "11n":
                        icon.setAttribute("src" ,"./images/06.jpg")
            break;      
            case "13d":
                case "13n":
                    icon.setAttribute("src" ,"./images/06.jpg")
                    break;                                 
                    default:
                        icon.setAttribute("src" ,"./images/01.jpg")
                        break;
                    }
        
}

function displayTemperature(response){
    let cityElement = document.querySelector("#selectedCity")
    let temperatureElement = document.querySelector("#currentTemp")
    let dateElement = document.querySelector("#date")
    let timeElement = document.querySelector("#time")
    cityElement.innerHTML= response.data.name
    temperatureElement.innerHTML=`${Math.round(response.data.main.temp)}°C`
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    timeElement.innerHTML = formatTime(response.data.dt * 1000)
    
    iconSelect(response.data.weather[0].icon) 
    
                    
    getForecast(response.data.coord)
                }

                function search(city) {
    let apiKey = "ff992df60e8c388664e8c387bf3c174c"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature)
}


function inputCity(e) {
    if (e.key === "Enter") {
        let city = document.querySelector("#cityBox")
        let selectedCity = document.querySelector("#selectedCity")
        selectedCity.innerHTML = city.value
        search(city.value)
    }
}

search("Tehran")
let form = document.querySelector("#cityBox")
form.addEventListener("keypress", inputCity)