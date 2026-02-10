

# Weather App

A dynamic, responsive weather application that fetches real-time weather data from the OpenWeatherMap API and displays it with an intuitive interface that changes based on current weather conditions.

## Features

- **City Search**: Search for any city worldwide to get current weather information
- **Real-time Data**: Displays temperature, humidity, wind speed, and weather description
- **Dynamic Icons**: Weather icons change based on current conditions
- **Adaptive Backgrounds**: Background automatically changes based on weather (sunny, cloudy, rainy, snowy)
- **Error Handling**: User-friendly error messages for invalid city names
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Live Preview 
Visit this site to see - https://weather-app-details.vercel.app


## Technologies Used

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with gradients, transitions, and backdrop filters
- **JavaScript (ES6+)**: 
  - Fetch API with async/await for API calls
  - Dynamic DOM manipulation
  - Event handling for user interactions
- **OpenWeatherMap API**: Real-time weather data source
- **Font Awesome**: Weather icons and UI elements

## Project Structure

```
weather-app/
├── index.html          # Main HTML structure
├── style.css           # Styling with dynamic backgrounds
└── script.js           # JavaScript logic for API calls and UI updates
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/abidsejan/Weather-App.git
   ```

2. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

3. Replace `YOUR_API_KEY_HERE` in `script.js` with your actual API key

4. Open `index.html` in your web browser

## Usage

1. Enter a city name in the search field
2. Click the search button or press Enter
3. View the current weather information with dynamic background

## API Implementation

The application uses the OpenWeatherMap API endpoint:
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

## Future Enhancements

- [ ] 5-day weather forecast
- [ ] Geolocation support for automatic location detection
- [ ] Temperature unit conversion (Celsius/Fahrenheit)
- [ ] Weather animations
- [ ] Local storage for recent searches

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons provided by [Font Awesome](https://fontawesome.com/)

## Screenshots

<img width="1582" height="1034" alt="Screenshot 2025-08-22 at 9 08 39 AM" src="https://github.com/user-attachments/assets/6b459f52-4df3-4271-a93f-f052ad32fcf6" />
<img width="1582" height="1034" alt="Screenshot 2025-08-22 at 9 09 22 AM" src="https://github.com/user-attachments/assets/6ebf4f5f-026f-401a-b6fe-4db371cf6d77" />

