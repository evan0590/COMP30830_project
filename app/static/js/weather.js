liveweather=[];
const list = document.querySelector(".ajax-section .cities");

function loadWeather() {
    console.log(list);

	$.getJSON('http://127.0.0.1:5000/weather', function(data, status, xhr){
		for (var i = 0; i < data.length; i++ ) {
			liveweather[i]=[String(data[i].description), String(data[i].icon), data[i].temp,
			data[i].tempFeels,data[i].windSpeed,data[i].humidity,data[i].pressure];
		console.log(liveweather)

		const description = liveweather[0][0];
		const icon = `https://openweathermap.org/img/wn/${liveweather[0][1]}@2x.png`
		const temp = liveweather[0][2];
		const tempFeels = liveweather[0][3];
		const windSpeed = liveweather[0][4];
		const humidity = liveweather[0][5];
		const pressure = liveweather[0][6];
		console.log(icon);

      const li = document.createElement("li");
        console.log(li)
      li.getElementsByClassName("weatherList");
      const markup = `
            <h3><span>Weather</span></h3>
                <div class="ColumnRow">
                    <div class="ColumnWeathera">
                        <h5><b>${temp}<sup>°C</sup></b></h5>
                        <p>Feels like&nbsp;&nbsp;&nbsp;&nbsp;<b>${tempFeels}<sup>°C</sup></b></p>
                        <p>Wind&nbsp;&nbsp;&nbsp;&nbsp;<b>${windSpeed}m/s</b></p>
                        <p>Humidity&nbsp;&nbsp;&nbsp;&nbsp;<b>${humidity}%</b></p>
                        <p>Pressure&nbsp;&nbsp;&nbsp;&nbsp;<b>${pressure}hPa</b></p>
                        <figure><img class="city-icon" src=${icon} alt=${liveweather[0][1]}></figure>
                        <figcaption class="weather_desc"> <b>${description}</b></figcaption>
                    </div>
                </div>
            `;
        console.log(markup)
        li.innerHTML = markup;
        console.log(list)
        list.appendChild(li);
        }
    });

};
loadWeather(); //put this in for addlistener to update

console.log(liveweather);