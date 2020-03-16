liveweather=[];
const list = document.querySelector(".ajax-section .cities");

function loadWeather() {
    console.log(list);

	$.getJSON('http://127.0.0.1:5000/weather', function(data, status, xhr){
		for (var i = 0; i < data.length; i++ ) {
			liveweather[i]=[String(data[i].description), String(data[i].icon), data[i].temp,
			data[i].tempMin,data[i].tempMax];
		console.log(liveweather)

		const description = liveweather[0][0];
		const icon = `https://openweathermap.org/img/wn/${liveweather[0][1]}@2x.png`
		const temp = liveweather[0][2];
		const tempMin = liveweather[0][3];
		const tempMax = liveweather[0][4];
		console.log(icon);

      const li = document.createElement("li");
        console.log(li)
      li.getElementsByClassName("weatherList");
      const markup = `
            <h3><span>Weather</span></h3>
                <div class="ColumnRow">
                    <div class="ColumnWeathera">
                        <figure><img class="city-icon" src=${icon} alt=${liveweather[0][1]}></figure>
                        <p>Current temperature: <b>${temp}<sup>°C</sup></b></p>
                        <p>Minimum temperature: <b>${tempMin}<sup>°C</sup></b></p>
                        <p>Max temperature: <b>${tempMax}<sup>°C</sup></b></p>
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