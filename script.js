const input = document.querySelector("input");
const button = document.querySelector("button");

const boxData = document.querySelector("#weather-data");
const boxCloud = document.querySelector("#box-cloud");
const weekDay = document.querySelector("#week-day");
const date = document.querySelector("#date");
const cityName = document.querySelector("#city");
const temperature = document.querySelector("#temp");
const weatherInfo = document.querySelector("#weather-info");
const weatherImg = document.querySelector("#weather-image")
const wings = document.querySelector("#wing");
const humidity = document.querySelector("#humidity");
const vivus = new Vivus('cloud', {
    type: "oneByOne",
    duration: 150,
    animTimingFunction: Vivus.EASE,})



button.addEventListener("click", ()=>{
    if(!input.value) return alert("Write the name of city");
    getDataApi();
});

async function getDataApi(){
        vivus.play(vivus.getStatus() === 'end' ? -1 : 1);
    let urlConverter = `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=1ae69d2648521811adfd39240947a721`
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
            console.log(data)
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
    weatherImage(weatherInfo.innerText);
    humidity.innerText = data.main.humidity + "%"
    boxCloud.classList.add("d-none")
    boxData.classList.remove("d-none")
    boxData.classList.add("d-grid")
}

function correction(d){
    // corrigir data e dia da semana
    if(d === Number(d)) {return d < 10 ? "0" + d : d}
    else{
         if(d === "0") return "Sun |"
         if(d === "1") return "Mon |"
         if(d === "2") return "Tue |"
         if(d === "3") return "Wed |"
         if(d === "4") return "Thu |"
         if(d === "5") return "Fri |"
         if(d === "6") return "Sat |"
        }                    
}

function weatherImage(info){
    switch(String(info)){
        case "Broken clouds":
            weatherImg.setAttribute('src', './assets/cloudy.svg')
            break;
        case "Overcast clouds":
            weatherImg.setAttribute('src', './assets/overclouds.svg')
            break;
        case "Fog":
            weatherImg.setAttribute('src', './assets/cloudy.svg')
            break;
        case "Clear sky":
                weatherImg.setAttribute('src', './assets/clear.svg')
            break;
        case "":
            break;
        case "":
            break;
    }
    
}