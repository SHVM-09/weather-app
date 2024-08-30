import { useState, useEffect, useRef } from "react";
import CityCard from "./CityCard";
import { CiSearch } from "react-icons/ci";
import { fetchWeatherData } from "../Api";
import ClipLoader from "react-spinners/ClipLoader";

const Weather = () => {
  // State to store the list of city names
  const [cities, setCities] = useState([
    "Gandhinagar",
    "Moscow",
    "New York",
    "Tokyo",
    "London",
    "Sydney",
  ]);

  // State to store the weather data for the cities
  const [weatherData, setWeatherData] = useState([]);

  // State to manage the index of the selected city for displaying temperature trends
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);

  // State to manage the loading state while fetching weather data
  const [loading, setLoading] = useState(false);

  // Reference to the input element for search functionality
  const inputRef = useRef();

  // Function to search for weather data of a city
  const search = async (city) => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    const data = await fetchWeatherData(city);
    setLoading(false);

    if (data) {
      // Update weather data state with the new city data
      setWeatherData((prevData) => {
        if (prevData.length >= 5) {
          return [data, ...prevData.slice(0, 4)];
        } else {
          return [data, ...prevData];
        }
      });

      // Update cities state with the new city
      setCities((prevCities) => {
        if (prevCities.length >= 5) {
          return [city, ...prevCities.slice(0, 4)];
        } else {
          return [city, ...prevCities];
        }
      });

      // Clear the search input
      inputRef.current.value = "";
    }
  };

  // Function to handle removal of a city from the list
  const handleCityRemove = (index) => {
    setWeatherData((prevData) => prevData.filter((_, i) => i !== index));
    setCities((prevCities) => prevCities.filter((_, i) => i !== index));
  };

  // Function to handle key down events on the search input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  // Fetch initial weather data for the default cities
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const weatherPromises = cities.map((city) => fetchWeatherData(city));
      const results = await Promise.all(weatherPromises);
      setWeatherData(results.filter((data) => data !== null));
      setLoading(false);
    };

    fetchInitialData();
  }, [cities]);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-8">
      {/* Search input and button */}
      <div className="mb-6 flex w-full flex-wrap items-center gap-3 sm:max-w-lg">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for a city"
          className="h-12 flex-grow rounded-lg border border-gray-300 px-4 text-lg outline-none focus:border-gray-500"
          onKeyDown={handleKeyDown}
        />
        <button
          className="flex h-12 w-12 min-w-[3rem] items-center justify-center rounded-lg bg-gray-200 text-xl hover:bg-gray-300"
          onClick={() => search(inputRef.current.value)}
        >
          <CiSearch />
        </button>
      </div>

      {/* Loading spinner or weather data display */}
      {loading ? (
        <ClipLoader /> // Show loader while fetching data
      ) : (
        <div className="grid w-full max-w-4xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {weatherData.length > 0 ? (
            // Display weather data for each city
            weatherData.map((weather, index) => (
              <CityCard
                key={index}
                weather={weather}
                index={index}
                handleCityRemove={handleCityRemove}
                selectedCityIndex={selectedCityIndex}
                setSelectedCityIndex={setSelectedCityIndex}
              />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <p className="text-lg text-gray-600">
                No weather data to display 😔
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
