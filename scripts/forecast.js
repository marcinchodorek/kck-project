const todayCardContainer = document.querySelector('.today');
const tomorrowCardContainer = document.querySelector('.tomorrow');

const cities = ['Zakopane', 'Szczyrk', 'Kielce', 'Cracow'];

const getCity = async (city) => {
    const requestEndpoint = "//dataservice.accuweather.com/locations/v1/cities/search";
    const cityQuery = `?apikey=${api_key}&q=${city}&details=true`;
    const response = await fetch(requestEndpoint + cityQuery);
    const cityData = await response.json();


    return cityData[0];
};

const getWeather = async (city) => {
    const requestEndpoint = `//dataservice.accuweather.com/currentconditions/v1/${city}`;
    const weatherQuery = `?apikey=${api_key}&details=true`;
    const response = await fetch(requestEndpoint + weatherQuery);
    const weatherData = await response.json();

    return weatherData[0];
};

const getForecast = async (city) => {
    const requestEndpoint = `//dataservice.accuweather.com/forecasts/v1/daily/1day/${city}`;
    const forecastQuery = `?apikey=${api_key}&metric=true&details=true`;
    const response = await fetch(requestEndpoint + forecastQuery);
    const forecastData = await response.json();

    return forecastData;
};

const getData = async (city) => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);
    const forecastData = await getForecast(cityData.Key);

    return { cityData, weatherData, forecastData };
}

const udpateCards = (data) => {
    const { cityData, weatherData, forecastData } = data;
    const cardImg = weatherData.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';


    todayCardContainer.innerHTML += `
        <div class="weather-card">
            <img src="${cardImg}" class="time">
            <img src="icons/${weatherData.WeatherIcon}.svg" alt="" class="icon">
            <div class="card-content">
                <h3>${cityData.LocalizedName}</h3>
                <div>${weatherData.WeatherText}</div>
                <div>${weatherData.Temperature.Metric.Value}&deg;C</div>
                <div>Wind direction: ${weatherData.Wind.Direction.Localized}</div>
                <div>Wind speed: ${weatherData.Wind.Speed.Metric.Value} km/h</div>
            </div>
        </div>
    `;
    tomorrowCardContainer.innerHTML += `
        <div class="weather-card">
            <img src="${cardImg}" class="time">
            <img src="icons/${forecastData.DailyForecasts[0].Day.Icon}.svg" alt="" class="icon">
            <div class="card-content">
                <h3>${cityData.LocalizedName}</h3>
                <div>${forecastData.DailyForecasts[0].Day.IconPhrase}</div>
                <div>Max: ${forecastData.DailyForecasts[0].Temperature.Maximum.Value}&deg;C</div>
                <div>Min: ${forecastData.DailyForecasts[0].Temperature.Minimum.Value}&deg;C</div>
                <div>Wind direction: ${forecastData.DailyForecasts[0].Day.Wind.Direction.Localized}</div>
                <div>Wind speed: ${forecastData.DailyForecasts[0].Day.Wind.Speed.Value} km/h</div>
            </div>
        </div>
    `;
}



cities.forEach(city => {
    getData(city).then(data => {
        udpateCards(data);
    }).catch(() => {
        tomorrowCardContainer.innerHTML += `
            <div class="err">
                <p class="err-content">Problem with displaying some of the data</p>
                <button class="err-btn" onclick="removeElement(this)"><i class="fas fa-times"></i></button>
            </div>
        `;
    });
});


