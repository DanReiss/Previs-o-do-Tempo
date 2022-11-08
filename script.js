const input = document.querySelector("input");
const button = document.querySelector("button");

const weekDay = document.querySelector("#week-day");
const date = document.querySelector("#date");
const temperature = document.querySelector("#temp");
const wings = document.querySelector("#wing");
const humidity = document.querySelector("#humidity");

button.addEventListener("click", ()=>{
    if(!input.value) alert("Write the name of city");
    getDataApi();
});

async function getDataApi(){
    let urlConverter = `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=1ae69d2648521811adfd39240947a721`
    try{
        await fetch(urlConverter)
        .then(res => res.json())
        .then(data => {
            if(!data.cod && data.cod == "404"){
                return alert("Local não encontrado!");
            }
            input.value = '';
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
};


function WriteData(data){
    
}