const input = document.querySelector("input");
const button = document.querySelector("button");

const boxData = document.querySelector("#weather-data");
const boxCloud = document.querySelector("#box-cloud");
const weekDay = document.querySelector("#week-day");
const date = document.querySelector("#date");
const cityName = document.querySelector("#city");
const temperature = document.querySelector("#temp");
const weatherInfo = document.querySelector("#weather-info");
const wings = document.querySelector("#wing");
const humidity = document.querySelector("#humidity");
const vivus = new Vivus('cloud', {
    type: "oneByOne",
    duration: 150,
    animTimingFunction: Vivus.EASE,
})

const weatherOptions = [
    {name: "Scattered clouds", src: "./assets/cloudy.svg"},
    {name: "Broken clouds", src: "./assets/cloudy.svg"},
    {name: "Overcast clouds", src: "./assets/overclouds.svg"},
    {name: "Fog", src: "./assets/cloudy.svg"},
    {name: "Clear sky", src: "./assets/clear.svg"},
    {name: "Light rain", src: "./assets/clear.svg"},
    {name: "Thunderstorm with light rain", src: "./assets/heaverain.svg"}
]

button.addEventListener("click", ()=>{
    if(!input.value) return alert("Write the name of city");
    getDataApi();
});

async function getDataApi(){
        vivus.play(vivus.getStatus() === 'end' ? -1 : 1);
    let urlConverter = `https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=1ae69d2648521811adfd39240947a721`
    try{
        await fetch(urlConverter)
        .then(res => res.json())
        .then(data => {
            input.value = '';
            if(!data[0] || !data.cod && data.cod === "404" ){
                vivus.finish();
                return alert("Local não encontrado! Por favor escreva corretamente, não esqueça dos espaços!")
            } 
            convert(data[0])
        })
    }catch(err){
        alert(err)
    };

    async function convert(data){
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=1ae69d2648521811adfd39240947a721`
    try{
        await fetch(url)
        .then(res => res.json())
        .then(data => {
            if(!data.cod && data.cod == "404"){
                return alert("Local não encontrado!");
            }
            WriteData(data);
        })
    }catch(err){
        alert(err)
    };
    }
    vivus.finish()
};


function WriteData(data){
    // const NEW_DATE = new Date();
    // weekDay.innerText = correction(String(NEW_DATE.getDay()));
    // date.innerText = `${correction(NEW_DATE.getDate())}/${correction(NEW_DATE.getMonth()) + 1}/${NEW_DATE.getFullYear()}`
    cityName.innerText = data.name
    temperature.innerText = Math.floor(Number(data.main.temp) - 273) + "°C";
    weatherInfo.innerText = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1)
    wings.innerText = data.wind.speed + " km/h"
    renderWeatherImage(weatherInfo.innerText);
    humidity.innerText = data.main.humidity + "%"
    boxCloud.classList.add("d-none")
    boxData.classList.remove("d-none")
    boxData.classList.add("d-grid")
}

function renderWeatherImage(type){
    for(let option of weatherOptions){
        if(option.name === type){
            document.querySelector("#weather-image").setAttribute("src", option.src)
            return;
        }
    }
    document.querySelector("#weather-image").setAttribute("src", "./assets/cloudy.svg")
}