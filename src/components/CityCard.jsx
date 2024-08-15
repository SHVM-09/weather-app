import {
  WiThermometerExterior,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import { useEffect } from "react";

// Register Chart.js components
Chart.register(...registerables);

const CityCard = ({
  weather,
  index,
  handleCityRemove,
  selectedCityIndex,
  setSelectedCityIndex,
}) => {
  // Handler for toggling the visibility of temperature trends
  const handleButtonClick = () =>
    setSelectedCityIndex(selectedCityIndex === index ? null : index);

  return (
    <div
      className={`relative flex min-w-[300px] flex-col items-center rounded-lg p-8 shadow-lg ${
        index === 0 ? "border border-blue-400 bg-blue-100" : "bg-gray-50"
      }`}
    >
      {/* Remove city button */}
      <button
        className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
        onClick={() => handleCityRemove(index)}
      >
        &#10005;
      </button>

      {/* Weather icon */}
      <img src={weather.icon} alt="weather icon" className="mb-6 h-28 w-28" />

      {/* Current temperature */}
      <p className="text-5xl font-bold text-gray-800">{weather.temp}°C</p>

      {/* City name and country */}
      <p className="mt-4 text-2xl font-semibold text-gray-600">
        {weather.name}, {weather.country}
      </p>

      {/* Current date */}
      <p className="mt-2 text-lg text-gray-500">
        {new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Weather description */}
      <p className="mb-8 text-gray-600">{weather.description}</p>

      {/* Weather metrics */}
      <div className="mb-8 flex w-full justify-around text-gray-700">
        <div className="flex flex-col items-center">
          <WiHumidity className="h-6 w-6 text-gray-700" title="Humidity" />
          <p className="text-sm">{weather.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="h-6 w-6 text-gray-700" title="Wind Speed" />
          <p className="text-sm">{weather.wind} km/h</p>
        </div>
        <div className="flex flex-col items-center">
          <WiThermometerExterior
            className="h-6 w-6 text-gray-700"
            title="Lowest Temperature"
          />
          <p className="text-sm">{weather.minTemp}°C</p>
        </div>
        <div className="flex flex-col items-center">
          <WiThermometer
            className="h-6 w-6 text-gray-700"
            title="Highest Temperature"
          />
          <p className="text-sm">{weather.maxTemp}°C</p>
        </div>
      </div>

      {/* Forecast for the next few days */}
      <div className="grid w-full grid-cols-3 gap-4">
        {weather.forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg bg-gray-200 p-2"
          >
            <p className="text-sm text-gray-700">
              {new Date(day.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt="weather icon"
              className="h-12 w-12"
            />
            <p className="text-lg text-gray-700">{day.temp}°C</p>
          </div>
        ))}
      </div>

      {/* Temperature trends chart */}
      {selectedCityIndex === index && weather.trendData.dates.length > 0 && (
        <div className="mt-6 w-full">
          <p className="mb-4 text-xl font-semibold text-gray-700">
            Temperature Trends
          </p>
          <Line
            data={{
              labels: weather.trendData.dates,
              datasets: [
                {
                  label: "Temperature (°C)",
                  data: weather.trendData.temperatures,
                  borderColor: "#3498db",
                  backgroundColor: "rgba(52, 152, 219, 0.2)",
                  borderWidth: 2,
                  pointRadius: 0,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Temp: ${tooltipItem.raw}°C`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    callback: (value) => weather.trendData.dates[value],
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}

      {/* Button to toggle temperature trends */}
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={handleButtonClick}
      >
        {selectedCityIndex === index ? "Hide Trends" : "Show Trends"}
      </button>
    </div>
  );
};

export default CityCard;
