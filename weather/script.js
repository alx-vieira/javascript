let apiKey = 'Here goes the API key...';
let fixedHour = {};

document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let searchInput = document.querySelector('#searchInput').value;
    
    if(searchInput !== '') {
        clearInfo();
        showWarning('Loading...');

        let urlOneCall = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
        let urlGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(searchInput)}&limit=1&appid=${apiKey}`;
        

        let results = await fetch(urlGeocoding);
        let json = await results.json();
        
        if(json[0]) {
            let lat = await json[0].lat;
            let lon = await json[0].lon;
            let city = await json[0].name;
            let state = await json[0].state;

            let urlSearch = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            let weatherResults = await fetch(urlSearch);
            let weatherJson = await weatherResults.json();

            if(weatherJson) {
                let sunriseTimestamp = weatherJson.sys.sunrise * 1000;

                FixHour(sunriseTimestamp, 'sunrise');

                if(fixedHour.name == 'sunrise') {
                    sunrise = fixedHour.fix;
                }

                let sunsetTimestamp = weatherJson.sys.sunset * 1000;

                FixHour(sunsetTimestamp, 'sunset');
                
                if(fixedHour.name == 'sunset') {
                    sunset = fixedHour.fix;
                }

                showInfo({
                    temperature: weatherJson.main.temp,
                    tempMax: weatherJson.main.temp_max,
                    tempMin: weatherJson.main.temp_min,
                    sunrise: sunrise,
                    sunset: sunset,
                    termicSensation: weatherJson.main.feels_like,
                    humidity: weatherJson.main.humidity,
                    country: weatherJson.sys.country,
                    city: city,
                    state: state,
                    mainDescription: weatherJson.weather[0].main,
                    description: weatherJson.weather[0].description,
                    tempIcon: weatherJson.weather[0].icon,
                    windSpeed: weatherJson.wind.speed,
                    windDirection: weatherJson.wind.deg,
                });
            }
        } else {
            clearInfo();
            showWarning('City not found.')
        }
    } else {
        clearInfo();
    }
})

function FixHour(timestamp, name) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    fixedHour = {
        name,
        fix: `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`
    };
    return fixedHour;
}

function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.city}/${json.state} - ${json.country}`;
    document.querySelector('.sub-titulo').innerHTML = json.mainDescription;
    document.querySelector('.description-text').innerHTML = json.description;

    document.querySelector('.tempInfo').innerHTML = `${json.temperature} <sup>º</sup>C`;
    document.querySelector('.ventoInfo').innerHTML = `${(json.windSpeed * 3.6).toFixed(2)} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDirection - 90}deg)`;

    document.getElementById('max').innerHTML = `${json.tempMax} <sup>º</sup>C`;
    document.getElementById('min').innerHTML = `${json.tempMin} <sup>º</sup>C`;

    document.getElementById('termSens').innerHTML = `${json.termicSensation} <sup>º</sup>C`;
    document.getElementById('humidity').innerHTML = `${json.humidity} %`;

    document.getElementById('sunset').innerHTML = `${json.sunset}`;
    document.getElementById('sunrise').innerHTML = `${json.sunrise}`;
}

function showWarning(msg) {
    document.querySelector('.warning').innerHTML = msg;
    setTimeout(() => {
        document.querySelector('.warning').innerHTML = '';
    }, "5000");
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}
