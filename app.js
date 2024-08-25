const inp=document.querySelector('input');
const btn=document.querySelector('button');
const humidity=document.querySelector('.humidity');
const temp=document.querySelector('.temp');
const wind=document.querySelector('.wind');
const cityName=document.querySelector('.city');
const img=document.querySelector('.weather-icon');

const apiKey="5b3f70fa31997972103602a151b7a670"
const apiUrl=`https://api.openweathermap.org/data/2.5/weather?units=metric`;

async function checkWeather(city){
    
    const response=await fetch(apiUrl+`&q=${city}&appid=${apiKey}`);
    var data =await response.json();
    console.log(data)

    if (!response.ok) {  
		
        console.log(response.statusText)
        cityName.innerText ="Not Found";
        temp.innerText ="--"
        wind.innerText ="--"
        humidity.innerText ="--"
        img.setAttribute('src',`images/error.png`)
        throw new Error(`HTTP error! status: ${response.status.message}`);  
	}

    cityName.innerText =data.name;
    temp.innerText     =Math.round(data.main.temp) + "°C";
    humidity.innerText =data.main.humidity + "%";
    wind.innerText     =data.wind.speed + " km/h"
    img.setAttribute('src',`images/${data.weather[0].main}.png`)
}

btn.addEventListener('click',function(){
    const city=inp.value;
    inp.value="";
    checkWeather(city);
})