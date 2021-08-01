
function displayTemperature(response){
    console.log(response)
    let cityElement = document.querySelector("#selectedCity")
    let temperatureElement = document.querySelector("#currentTime")
    cityElement.innerHTML= response.data.name
    temperatureElement.innerHTML=`${Math.round(response.data.main.temp)}°C`
}


let apiKey = "ff992df60e8c388664e8c387bf3c174c"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)