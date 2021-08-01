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

function displayTemperature(response){
    console.log(response)
    let cityElement = document.querySelector("#selectedCity")
    let temperatureElement = document.querySelector("#currentTemp")
    let dateElement = document.querySelector("#date")
    let timeElement = document.querySelector("#time")
    cityElement.innerHTML= response.data.name
    temperatureElement.innerHTML=`${Math.round(response.data.main.temp)}°C`
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    timeElement.innerHTML = formatTime(response.data.dt * 1000)

}


let apiKey = "ff992df60e8c388664e8c387bf3c174c"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)