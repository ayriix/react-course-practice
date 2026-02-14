import { useState, useEffect } from "react";
import "./index.css";

const KEY = import.meta.env.VITE_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Too old browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (error) => {
        setError("Geolocation does not given!");
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!city.trim() && !coords) {
      setWeatherData(null);
      setError(null);
      return;
    }

    async function getData() {
      setLoading(true);
      try {
        const query = city.trim()
          ? city
          : `${coords.latitude},${coords.longitude}`;

        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${query}&lang=ru`,
          { signal }
        );
        const data = await response.json();

        if (data.error) {
          setError(data.error.message);
          setWeatherData(null);
          return;
        }
        setWeatherData(data);
        setError(null);
      } catch {
        setError("Failed to fetch data");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    }
    getData();

    return () => controller.abort();
  }, [city, coords]);

  function renderError() {
    return <p>{error}</p>;
  }
  function renderLoading() {
    return <p>Loading...</p>;
  }
  function renderWeather() {
    return (
      <div className="weather-card">
        <h2>
          {weatherData.location.name}, {weatherData.location.country}
        </h2>
        <img
          src={`https:${weatherData?.current?.condition?.icon}`}
          alt="icon"
          className="weather-icon"
        />
        <p className="temperature">
          {Math.round(weatherData?.current?.temp_c)}°C
        </p>
        <p className="condition">{weatherData?.current?.condition?.text}</p>
        <div className="weather-details">
          <p>Влажность: {weatherData?.current?.humidity}%</p>
          <p>Ветер: {weatherData?.current?.wind_kph} км/ч</p>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <TimerComponent />
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather widget</h1>
          <div className="search-container">
            <input
              type="text"
              value={city}
              placeholder="Enter city name"
              className="search-input"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        {error && renderError()}
        {loading && renderLoading()}
        {!loading && !error && weatherData && renderWeather()}
      </div>
    </div>
  );
}

function TimerComponent() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  return (
    <div>
      <span>Ticks: {count}</span>
      <button onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => setCount(0)} disabled={isRunning}>
        Clear
      </button>
    </div>
  );
}

export default App;
