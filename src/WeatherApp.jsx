import React, { useState } from "react"; // Import React and the useState hook

// Import custom components
import Input from "./components/Input"; // Text input field
import { CardContent, Card } from "./components/Cards"; // Styled card components
import Button from "./components/Button"; // Reusable button

// Import weather icons
import { Sun, CloudRain, Snowflake } from "lucide-react"; // Icons for different weather types

const APIKEY = "my key"; // Your OpenWeatherMap API key

const WeatherApp = () => {
  // State to store the city name typed by the user
  const [city, setcity] = useState("");

  // State to hold weather data after fetching from the API
  const [weather, setweather] = useState(null);

  // Loading state to show "Loading..." while data is being fetched
  const [loading, setloading] = useState(false);

  // State to store and display error messages
  const [error, seterror] = useState("");

  // Function to fetch weather data from OpenWeatherMap API
  const fetchweather = async () => {
    setloading(true);      // Start showing loading spinner/text
    seterror("");          // Clear previous error

    try {
      // Make the API call to fetch weather by city name
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
      );

      // If the city is not found or request fails
      if (!response.ok) throw new Error("City not found");

      // Convert response into JSON and store the data
      const data = await response.json();
      setweather(data);   // Store weather info in state
      console.log(data);  // Optional: log full weather object for debug
    } catch (error) {
      seterror(error.message); // Set error message
      setweather(null);        // Clear old weather data
    }

    setloading(false); // Stop loading indicator
  };

  // Function to choose the right icon based on weather type
  const getweathericon = (main) => {
    switch (main) {
      case "Clear":
        return <Sun className="text-yellow-400 w-10 h-10" />; // Sun icon
      case "Rain":
        return <CloudRain className="text-blue-400 w-10 h-10" />; // Rain icon
      case "Snow":
        return <Snowflake className="text-blue-200 w-10 h-10" />; // Snow icon
      default:
        return null; // If no matching icon, return nothing
    }
  };

  return (
    // Main container: full height with gradient background
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-4">
      
      {/* Card wrapper for the weather UI */}
      <Card className="w-full max-w-md">
        <CardContent>
          {/* App title */}
          <h1 className="text-3xl font-bold mb-4 text-center">Weather App</h1>

          {/* Input field and Search button */}
          <div className="mb-4 flex gap-2">
            <Input
              type="text"
              value={city} // Shows what's typed in the box
              onChange={(e) => setcity(e.target.value)} // Update state when user types
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchweather(); // If user presses Enter, fetch weather
              }}
              placeholder="Enter city name" // Input hint
              className="flex-1"
            />

            {/* Button to search for weather */}
            <Button onClick={fetchweather} disabled={loading}>
              {loading ? "Loading..." : "Search"} {/* Show Loading... when fetching */}
            </Button>
          </div>

          {/* Error message if city not found or API fails */}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {/* Show weather info only if data is available */}
          {weather && (
            <div className="text-center mt-6">
              
              {/* Weather icon based on condition (Clear, Rain, etc.) */}
              {getweathericon(weather.weather[0].main)}

              {/* City and Country */}
              <h2 className="text-2xl font-semibold">
                {weather.name}, {weather.sys.country}
              </h2>

              {/* Main weather type and description */}
              <p className="text-lg text-gray-700">
                {weather.weather[0].main} - {weather.weather[0].description}
              </p>

              {/* Temperature in Celsius */}
              <p className="text-4xl font-bold text-blue-400">
                {Math.round(weather.main.temp)}°C
              </p>

              {/* "Feels like" temperature */}
              <p className="text-gray-600">
                Feels like: {Math.round(weather.main.feels_like)}°C
              </p>

              {/* Humidity percentage */}
              <p className="text-gray-600">
                Humidity: {weather.main.humidity}%
              </p>

              {/* Wind speed in m/s */}
              <p className="text-gray-600">
                Wind Speed: {weather.wind.speed} m/s
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Export the component to be used in App.jsx or elsewhere
export default WeatherApp;
