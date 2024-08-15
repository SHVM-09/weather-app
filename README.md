# Weather App

## Overview

The Weather App is a React-based application that provides current weather conditions and forecasts for multiple cities. It allows users to search for cities, view detailed weather information, and analyze temperature trends using charts. The app utilizes the OpenWeatherMap API to fetch weather data and features responsive design for both desktop and mobile views.

## File Structure

```
weather-app/
├── public/
│ └── vite.svg
├── src/
│ ├── components/
│ │ ├── CityCard.jsx
│ │ └── Weather.jsx
│ ├── Api.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css (Tailwind)
├── .env
├── .prettierrc
├── .gitignore
├── package.json
├── eslint.config.js
├── index.html
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### Description of Files and Directories

- **`public/index.html`**: The main HTML file for the application.
- **`src/components/CityCard.jsx`**: Component for displaying weather data and trends for a single city.
- **`src/components/Weather.jsx`**: Main component for managing city list, search functionality, and displaying multiple `CityCard` components.
- **`src/api.js`**: API utility functions for fetching weather data and temperature trends.
- **`src/App.jsx`**: Root component of the application.
- **`src/main.jsx`**: Entry point for the React application.
- **`src/index.css`**: Tailwind CSS configuration.
- **`.env`**: Environment variables (e.g., API keys) required for the application.
- **`package.json`**: Project metadata and dependencies.
- **`vite.config.js`**: Vite configuration file.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SHVM-09/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your OpenWeatherMap API key:
     ```env
     VITE_APP_ID=your_openweathermap_api_key
     ```

## Development

To start the development server and view the app locally:

```bash
npm run dev
```

This command will start the Vite development server, and you can access the application at http://localhost:5173 in your browser.

## Usage

### Search for geeting info on weather for any city:

Type the name of the city into the search input field and press Enter or click the search button (magnifying glass icon). The weather information for the city will be fetched and displayed.
View Weather Information:

The weather details, including current temperature, humidity, wind speed, and weather description, will be shown for each city. Additionally, a 3-day weather forecast will be displayed.
Analyze Temperature Trends:

For each city, you can view temperature trends over the past few days by clicking the "Show Trends" button. A chart displaying temperature trends will be visible.
Remove Cities:

To remove a city from the list, click the "X" button on the corresponding city card.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes. Ensure that you follow the coding standards and include appropriate tests for your modifications.

## Acknowledgements

- OpenWeatherMap API: For providing weather data and forecasts.
- React: For the front-end framework.
- Vite: For the fast development build tool.
- Tailwind CSS: For styling the application.
- Chart.js: For creating the temperature trend charts.
