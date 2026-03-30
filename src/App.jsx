import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "cabbb97eb5b34bb981260915263003";
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?key=${API_KEY}&q=${city}&aqi=no`,
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather({
        city: data.location.name + ", " + data.location.country,
        temp: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        icon: data.current.condition.icon,
      });
      setCity("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex items-center justify-center p-4 ${
        darkMode
          ? "bg-linear-to-b from-gray-800 to-gray-900"
          : "bg-linear-to-b from-blue-400 to-blue-600"
      }`}
    >
      <div
        className={`rounded-lg shadow-lg p-8 max-w-md w-full transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Header with Dark Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-center flex-1">Weather App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            title="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                darkMode
                  ? "bg-gray-600 border-gray-500 focus:ring-blue-400 text-white placeholder-gray-400"
                  : "border-gray-300 focus:ring-blue-500 text-gray-800"
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Weather Display */}
        {weather ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{weather.city}</h2>
            <div
              className={`rounded-lg p-6 mb-4 transition ${
                darkMode ? "bg-gray-600" : "bg-blue-50"
              }`}
            >
              <p className="text-5xl font-bold text-blue-500 mb-2">
                {weather.temp}°C
              </p>
              <p
                className={`text-lg mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {weather.condition}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div
                  className={`p-3 rounded transition ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                    Humidity
                  </p>
                  <p className="font-semibold">{weather.humidity}%</p>
                </div>
                <div
                  className={`p-3 rounded transition ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                    Wind Speed
                  </p>
                  <p className="font-semibold">{weather.wind} m/s</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            <p>Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
