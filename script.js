const input = document.querySelector("input");
const form = document.querySelector("#search-form");

const boxData = document.querySelector("#weather-data");
const boxCloud = document.querySelector("#box-cloud");
const weekDay = boxData.querySelector("#week-day");
const date = boxData.querySelector("#date");
const cityName = boxData.querySelector("#city");
const temperature = boxData.querySelector("#temp");
const weatherInfo = boxData.querySelector("#weather-info");
const wings = boxData.querySelector("#wing");
const humidity = boxData.querySelector("#humidity");
const vivus = new Vivus('cloud', {
	type: "oneByOne",
	duration: 150,
	animTimingFunction: Vivus.EASE,
})

const weatherOptions = [
	{ name: "Scattered clouds", src: "./assets/cloudy.svg" },
	{ name: "Broken clouds", src: "./assets/cloudy.svg" },
	{ name: "Overcast clouds", src: "./assets/overclouds.svg" },
	{ name: "Fog", src: "./assets/cloudy.svg" },
	{ name: "Clear sky", src: "./assets/clear.svg" },
	{ name: "Light rain", src: "./assets/rain.svg" },
	{ name: "Thunderstorm with light rain", src: "./assets/heaverain.svg" }
]

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!input.value) return alert("Write the name of city");
	getDataApi();
});

async function getDataApi() {
	vivus.play(vivus.getStatus() === 'end' ? -1 : 1);
	let urlConverter = `https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=1ae69d2648521811adfd39240947a721`;
	
	const res = await fetch(urlConverter);
	const data = await res.json();

	input.value = '';
	convert(data[0]);
};

async function convert(data) {
	try {
		if (!data || data.cod == "404") {
			throw new Error("City not Found! Please write correctly")
		}

		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=1ae69d2648521811adfd39240947a721`
		const res = await fetch(url);
		const weatherData = await res.json();
		WriteData(weatherData);
		vivus.finish();
	} catch (err) {
		alert(err);
		vivus.play();
	};
}

function WriteData(data) {
	cityName.innerText = data.name;
	temperature.innerText = Math.floor(Number(data.main.temp) - 273) + "°C";
	weatherInfo.innerText = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1);
	wings.innerText = data.wind.speed + " km/h";
	humidity.innerText = data.main.humidity + "%";
	renderWeatherImage(weatherInfo.innerText);
	boxCloud.classList.add("d-none");
	boxData.classList.replace("d-none", "d-grid");
}

function renderWeatherImage(type) {
	for (let option of weatherOptions) {
		if (option.name === type) {
			document.querySelector("#weather-image").setAttribute("src", option.src);
			return;
		}
	}
	document.querySelector("#weather-image").setAttribute("src", "./assets/cloudy.svg");
}