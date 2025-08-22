// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');
const cityTime = document.getElementById('city-time');

// API Key (Replace with your actual OpenWeatherMap API key)
const apiKey = '6e26273d025ce910c62b23470911d297'; // Replace with your OpenWeatherMap API key

// Event Listeners
searchBtn.addEventListener('click', getWeatherData);
cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        getWeatherData();
    }
});

// Function to fetch weather data
async function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError();
        return;
    }
    
    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
            console.error('Weather API response not OK:', response.status, response.statusText);
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        let timezoneOffset = 0;
        try {
            // Fetch timezone data
            const timezoneResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,daily,minutely,alerts&appid=${apiKey}`
            );
            
            if (!timezoneResponse.ok) {
                console.error('Timezone API response not OK:', timezoneResponse.status, timezoneResponse.statusText);
                throw new Error('Timezone data not found');
            }
            
            const timezoneData = await timezoneResponse.json();
            timezoneOffset = timezoneData.timezone_offset;
        } catch (timezoneError) {
            console.error('Error fetching timezone data:', timezoneError);
            // Continue without timezone data
        }
        
        displayWeatherData(data, timezoneOffset);
        hideError();
        console.log('Attempting to make weather-info visible.');
        document.getElementById('weather-info').classList.add('visible');
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    }
}

// Function to display weather data
function displayWeatherData(data, timezoneOffset) {
    // Update city name
    cityName.textContent = data.name;
    
    // Update city time
    updateCityTime(timezoneOffset);
    
    // Update temperature
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    
    // Update weather description
    description.textContent = data.weather[0].description;
    
    // Update humidity
    humidity.textContent = `${data.main.humidity}%`;
    
    // Update wind speed
    windSpeed.textContent = `${data.wind.speed} m/s`;
    
    // Update weather icon
    updateWeatherIcon(data.weather[0].main);
    
    // Update background based on weather
    updateBackground(data.weather[0].main, data.dt, data.sys.sunrise, data.sys.sunset);
}

// Function to update city time
function updateCityTime(timezoneOffset) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityLocalTime = new Date(utc + (1000 * timezoneOffset));

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    cityTime.textContent = cityLocalTime.toLocaleTimeString('en-US', options);
}

// Function to update weather icon
function updateWeatherIcon(weatherCondition) {
    let iconClass = '';
    
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            iconClass = 'fas fa-sun';
            break;
        case 'clouds':
            iconClass = 'fas fa-cloud';
            break;
        case 'rain':
            iconClass = 'fas fa-cloud-rain';
            break;
        case 'drizzle':
            iconClass = 'fas fa-cloud-drizzle';
            break;
        case 'thunderstorm':
            iconClass = 'fas fa-bolt';
            break;
        case 'snow':
            iconClass = 'fas fa-snowflake';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            iconClass = 'fas fa-smog';
            break;
        default:
            iconClass = 'fas fa-cloud-sun';
    }
    
    weatherIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

// Function to update background based on weather
function updateBackground(weatherCondition, currentTime, sunrise, sunset) {
    const body = document.body;
    
    // Determine if it's day or night
    const isDay = currentTime > sunrise && currentTime < sunset;

    // Remove all weather-related classes
    body.classList.remove('sunny-day', 'sunny-night', 'cloudy-day', 'cloudy-night', 'rainy-day', 'rainy-night', 'snowy-day', 'snowy-night', 'default-day', 'default-night');
    
    let backgroundClass = '';

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            backgroundClass = isDay ? 'sunny-day' : 'sunny-night';
            break;
        case 'clouds':
            backgroundClass = isDay ? 'cloudy-day' : 'cloudy-night';
            break;
        case 'rain':
        case 'drizzle':
        case 'thunderstorm':
            backgroundClass = isDay ? 'rainy-day' : 'rainy-night';
            break;
        case 'snow':
            backgroundClass = isDay ? 'snowy-day' : 'snowy-night';
            break;
        default:
            backgroundClass = isDay ? 'default-day' : 'default-night';
    }
    
    body.classList.add(backgroundClass);
}

// Function to show error message
function showError() {
    errorMessage.style.display = 'block';
    document.getElementById('weather-info').classList.remove('visible');
}

// Function to hide error message
function hideError() {
    errorMessage.style.display = 'none';
}