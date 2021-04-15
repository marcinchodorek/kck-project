const todayCardContainer = document.querySelector('.today');
const tomorrowCardContainer = document.querySelector('.tomorrow');
const weatherContainer = document.querySelector('.weather-card');
const searchContainer = document.querySelector('.custom-forecast input');
const searchButton = document.querySelector('.custom-forecast button');
const customCardContainer = document.querySelector('.custom-container');
const searchForm = document.querySelector('.custom-forecast');
const customCity = JSON.parse(localStorage.getItem('customCity')) || '';

const cities = ['Zakopane', 'Szczyrk'];

const getData = async (city) => {
  const cityQuery = `//dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${city}&details=true`;
  const cityResponse = await fetch(cityQuery);
  const cityData = await cityResponse.json();

  const weatherQuery = `//dataservice.accuweather.com/currentconditions/v1/${cityData[0].Key}?apikey=${api_key}&details=true`;
  const weatherResponse = await fetch(weatherQuery);
  const weatherData = await weatherResponse.json();

  const forecastQuery = `//dataservice.accuweather.com/forecasts/v1/daily/1day/${cityData[0].Key}?apikey=${api_key}&metric=true&details=true`;
  const forecastResponse = await fetch(forecastQuery);
  const forecastData = await forecastResponse.json();

  return { cityData: cityData[0], weatherData: weatherData[0], forecastData };
};

const customSearch = (data) => {
  const { cityData, weatherData } = data;
  const cardImg = weatherData.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';

  customCardContainer.innerHTML = `
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
        ${
          weatherData.Temperature.Metric.Value <= 0.5
            ? `<div class="good">Weather is perfect for skiing</div>`
            : `<div class="bad">Weather is terrible for skiing</div>`
        }
    `;
};

const udpateCards = (data) => {
  const { cityData, weatherData, forecastData } = data;
  const cardImg = weatherData.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';
  const predictedAverage =
    (forecastData.DailyForecasts[0].Temperature.Maximum.Value +
      forecastData.DailyForecasts[0].Temperature.Minimum.Value) /
    2;

  todayCardContainer.innerHTML += `
        <div class="weather-card">
            <img src="${cardImg}" class="time">
            <img src="icons/${weatherData.WeatherIcon}.svg" alt="" class="icon">
            <div class="card-content">
                <h3>${cityData.LocalizedName}</h3>
                <div>${weatherData.WeatherText}</div>
                <div>${weatherData.Temperature.Metric.Value}&deg;C</div>
                <div>Wind direction: ${
                  weatherData.Wind.Direction.Localized
                }</div>
                <div>Wind speed: ${
                  weatherData.Wind.Speed.Metric.Value
                } km/h</div>
            </div>
            ${
              weatherData.Temperature.Metric.Value <= 0.5
                ? `<div class="good">Weather is perfect for skiing</div>`
                : `<div class="bad">Weather is terrible for skiing</div>`
            }
        </div>
    `;
  tomorrowCardContainer.innerHTML += `
        <div class="weather-card">
            <img src="${cardImg}" class="time">
            <img src="icons/${
              forecastData.DailyForecasts[0].Day.Icon
            }.svg" alt="" class="icon">
            <div class="card-content">
                <h3>${cityData.LocalizedName}</h3>
                <div>${forecastData.DailyForecasts[0].Day.IconPhrase}</div>
                <div>Max: ${
                  forecastData.DailyForecasts[0].Temperature.Maximum.Value
                }&deg;C</div>
                <div>Min: ${
                  forecastData.DailyForecasts[0].Temperature.Minimum.Value
                }&deg;C</div>
                <div>Wind direction: ${
                  forecastData.DailyForecasts[0].Day.Wind.Direction.Localized
                }</div>
                <div>Wind speed: ${
                  forecastData.DailyForecasts[0].Day.Wind.Speed.Value
                } km/h</div>
            </div>
            ${
              predictedAverage <= 0.5
                ? `<div class="good">Weather will be perfect for skiing</div>`
                : `<div class="bad">Weather will be terrible for skiing</div>`
            }
        </div>
    `;
};

cities.forEach((city) => {
  getData(city)
    .then((data) => {
      udpateCards(data);
    })
    .catch(() => {
      todayCardContainer.innerHTML += `
            <div class="err">
                <p class="err-content">Problem with displaying some of the data</p>
                <button class="err-btn" onclick="removeElement(this)"><i class="fas fa-times"></i></button>
            </div>
        `;
      tomorrowCardContainer.innerHTML += `
            <div class="err">
                <p class="err-content">Problem with displaying some of the data</p>
                <button class="err-btn" onclick="removeElement(this)"><i class="fas fa-times"></i></button>
            </div>
        `;
    });
});

const getCustomData = (cityValue) => {
  getData(cityValue)
    .then((data) => {
      customSearch(data);
    })
    .catch(() => {
      customCardContainer.innerHTML += `
            <div class="err">
                <p class="err-content">Problem with displaying some of the data</p>
                <button class="err-btn" onclick="removeElement(this)"><i class="fas fa-times"></i></button>
            </div>
        `;
    });
};

customCity !== '' ? getCustomData(customCity) : '';
console.log(customCity);

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getCustomData(searchContainer.value.trim());
  localStorage.setItem(
    'customCity',
    JSON.stringify(searchContainer.value.trim())
  );
  searchForm.reset();
});

searchButton.addEventListener('click', (e) => {
  getCustomData(searchContainer.value.trim());
  localStorage.setItem(
    'customCity',
    JSON.stringify(searchContainer.value.trim())
  );
  searchForm.reset();
});
