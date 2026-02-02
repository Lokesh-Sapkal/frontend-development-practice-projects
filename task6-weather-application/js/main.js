const city = document.getElementById('input');
const search = document.getElementById('search');
const refresh = document.getElementById('reset');
const country = document.getElementById('location');
const time = document.getElementById('time');
const icon = document.getElementById("weather-icon");
const temp = document.getElementById('temp');
const feels_like = document.getElementById('feel');
const weather_cond = document.getElementById('w_cond');
const desc = document.getElementById('desc');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind');

search.addEventListener('click', searchLocation);
refresh.addEventListener('click', resetPage);

const api_key = "ae6ecea64135832bc7cb2276e2263da1";

async function searchLocation(e) {
    const city_name = city.value.trim();

    if (!city_name) {
        alert("Please enter city.");
        return;
    }

    const loc = await searchCity(city_name);

    if (!loc) {
        return;
    }

    const { lat, lon } = loc;

    const weather_info = await getWeatherByCity(lat, lon);
    console.log(weather_info);

    // Time //
    const utcMs = weather_info.dt * 1000;
    const offsetMs = weather_info.timezone * 1000;
    const localDate = new Date(utcMs + offsetMs);
    const hours = localDate.getUTCHours();
    const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hr12 = hours % 12 || 12;

    // Weather Icon //
    const iconCode = weather_info.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.src = iconUrl;

    // Add Details //
    country.textContent = weather_info.sys.country;
    time.textContent = hr12 + ':' + minutes + ' ' + ampm;
    temp.textContent = parseInt(weather_info.main.temp - 273.15) + ' °C';
    feels_like.textContent = parseInt(weather_info.main.feels_like - 273.15) + ' °C';
    weather_cond.textContent = weather_info.weather[0].main;
    desc.textContent = weather_info.weather[0].description;
    humidity.textContent = weather_info.main.humidity + ' %';
    wind_speed.textContent = weather_info.wind.speed + ' m/s';
}

// Refresh //
function resetPage(e) {
    city.value = '';
    country.textContent = '';
    time.textContent = '';
    icon.src = ' ';
    feels_like.textContent = '';
    temp.textContent = '';
    weather_cond.textContent = '';
    desc.textContent = '';
    humidity.textContent = '';
    wind_speed.textContent = '';
}

// Search //
async function searchCity(city) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
    const res = await fetch(url, {
        headers: {
            "User-Agent": "weather-application"
        }
    });
    const results = await res.json();

    if (!results || results.length === 0) {
        alert("City not found");
        return;
    }
    return {
        lat: results[0].lat,
        lon: results[0].lon,
    }
}

// Weather Info //
async function getWeatherByCity(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch weather");
    }

    return data;
}