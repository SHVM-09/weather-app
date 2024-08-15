import dayjs from "dayjs";

/**
 * Fetches weather data and forecast for a given city.
 * 
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Promise<object|null>} - The weather data and forecast, or null if an error occurs.
 */
export const fetchWeatherData = async (city) => {
  try {
    // Construct the URLs for weather and forecast data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

    // Fetch weather and forecast data concurrently
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    // Parse JSON responses
    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Process and filter forecast data
    const filteredForecast = [];
    const uniqueDates = new Set();
    const today = new Date().toLocaleDateString();

    for (const forecast of forecastData.list) {
      const date = new Date(forecast.dt_txt);
      const dateString = date.toLocaleDateString();

      // Add forecast data if the date is unique, and it's not today, and the time is 12:00
      if (
        !uniqueDates.has(dateString) &&
        date.getHours() === 12 &&
        dateString !== today
      ) {
        filteredForecast.push({
          date: forecast.dt_txt,
          temp: Math.round(forecast.main.temp),
          icon: forecast.weather[0].icon,
        });
        uniqueDates.add(dateString);

        if (filteredForecast.length === 3) {
          break;
        }
      }
    }

    // Fetch trend data for temperature trends
    const trendData = await fetchTrendData(city);

    // Return the consolidated weather data and forecast
    return {
      name: weatherData.name,
      country: weatherData.sys.country,
      humidity: weatherData.main.humidity,
      temp: Math.round(weatherData.main.temp),
      wind: weatherData.wind.speed,
      minTemp: Math.round(weatherData.main.temp_min),
      maxTemp: Math.round(weatherData.main.temp_max),
      icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      description: weatherData.weather[0].description,
      forecast: filteredForecast,
      trendData: trendData,
    };
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    alert("City not found or unable to fetch data");
    return null;
  }
};

/**
 * Fetches temperature trend data for a given city.
 * 
 * @param {string} city - The name of the city to fetch trend data for.
 * @returns {Promise<object>} - The temperature trend data with dates and temperatures.
 */
export const fetchTrendData = async (city) => {
  try {
    // Construct the URL for forecast data
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

    // Fetch forecast data
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    // Extract and format temperature trend data
    const temperatures = [];
    const dates = [];
    forecastData.list.forEach((entry) => {
      const date = dayjs(entry.dt_txt).format("D MMM");
      if (!dates.includes(date)) {
        temperatures.push(entry.main.temp);
        dates.push(date);
      }
    });

    // Return the temperature trend data
    return { dates, temperatures };
  } catch (error) {
    console.error("Error fetching trend data: ", error);
    return { dates: [], temperatures: [] };
  }
};
