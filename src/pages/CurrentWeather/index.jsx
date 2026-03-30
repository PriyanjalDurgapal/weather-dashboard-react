// src/pages/weather/CurrentWeather.jsx
import { useState, useEffect, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { getCurrentWeather, getAirQuality } from "../../services/weatherService";
import CurrentWeatherHeader from "../../components/weather/CurrentWeatherHeader";
import HourlyCharts from "../../components/weather/HourlyCharts";
import AirQualityCharts from "../../components/weather/AirQualityCharts";
import { weatherCodeMap } from "../../components/weather/WeatherIcon";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import CitySearch from "../../components/ui/CitySearch";

const CurrentWeather = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [activeTab, setActiveTab] = useState("weather");
  const [locationDenied, setLocationDenied] = useState(false);

  const isMobile = window.innerWidth < 768;

  const handleCitySelect = (city) => {
    setCoords({
      lat: city.latitude,
      lon: city.longitude,
    });
    setLocationDenied(false);
  };

  // GEOLOCATION
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
          setLocationDenied(false);
        },
        () => {
          setLocationDenied(true);
        }
      );
    } else {
      setLocationDenied(true);
    }
  }, []);

  // FETCH DATA
  useEffect(() => {
    if (!coords.lat || !coords.lon) return;

    const today = new Date().toISOString().split("T")[0];

    Promise.all([
      getCurrentWeather(coords.lat, coords.lon, today),
      getAirQuality(coords.lat, coords.lon, today),
    ])
      .then(([weatherRes, airRes]) => {
        setWeather(weatherRes);
        setAirQuality(airRes);
      })
      .catch(console.error);
  }, [coords]);

  // SAFE VALUES
  const tempNow = weather?.hourly?.temperature_2m?.[0] ?? "";
  const tempF = tempNow !== "" ? ((tempNow * 9) / 5 + 32).toFixed(1) : "";

  // ✅ FIXED: use hourly weathercode
  const weatherCode = weather?.hourly?.weathercode?.[0] ?? null;
  const condition =
    weatherCode !== null ? weatherCodeMap[weatherCode] || "Clear" : "";

  // WEATHER DATA
  const hourlyWeatherData = useMemo(() => {
    if (!weather) return [];
    return weather.hourly.time.map((t, i) => ({
      time: t.split("T")[1].slice(0, 5),
      temperature: weather.hourly.temperature_2m[i],
      humidity: weather.hourly.relativehumidity_2m[i],
      precipitation: weather.hourly.precipitation[i],
      windspeed: weather.hourly.windspeed_10m[i],
      uv_index: weather.hourly.uv_index?.[i] ?? 0,
      visibility: (weather.hourly.visibility?.[i] ?? 0) / 1000,
      precipitation_probability:
        weather.hourly.precipitation_probability?.[i] ?? 0,
    }));
  }, [weather]);

  // AIR QUALITY DATA
  const hourlyAirQualityData = useMemo(() => {
    if (!airQuality) return [];
    return airQuality.hourly.time.map((t, i) => ({
      time: t.split("T")[1].slice(0, 5),
      pm10: airQuality.hourly.pm10?.[i] ?? 0,
      pm2_5: airQuality.hourly.pm2_5?.[i] ?? 0,
      co: airQuality.hourly.carbon_monoxide?.[i] ?? 0,
      no2: airQuality.hourly.nitrogen_dioxide?.[i] ?? 0,
      so2: airQuality.hourly.sulphur_dioxide?.[i] ?? 0,
    }));
  }, [airQuality]);

  // PARTICLES
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 120 },
        color: { value: "#38bdf8" },
        move: { enable: true, speed: 1 },
        size: { value: 2 },
      },
    }),
    []
  );

  const bgGradient = useMemo(() => {
    if (condition === "Rain") return "from-blue-600 to-blue-400";
    if (condition === "Snow") return "from-indigo-400 to-white";
    if (tempNow > 30) return "from-orange-500 to-red-400";
    if (tempNow < 15) return "from-blue-800 to-gray-900";
    return "from-cyan-500 to-blue-400";
  }, [condition, tempNow]);

  if (!weather || !airQuality) return <LoadingSkeleton />;

  return (
    <div className="relative min-h-screen bg-gray-100">

      {/* LOCATION PERMISSION POPUP */}
      {locationDenied && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Location Access Needed</h2>
            <p className="mb-4">
              Please allow location access to see the weather for your area.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                setLocationDenied(false);
                navigator.geolocation.getCurrentPosition(
                  (pos) =>
                    setCoords({
                      lat: pos.coords.latitude,
                      lon: pos.coords.longitude,
                    }),
                  () => setLocationDenied(true)
                );
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!isMobile && (
        <Particles
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        <CurrentWeatherHeader
          weather={weather}
          tempNow={tempNow}
          tempF={tempF}
          condition={condition}
          bgGradient={bgGradient}
        />

        <div className="mb-4">
          <CitySearch onSelect={handleCitySelect} />
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("weather")}
            className={`px-4 py-2 rounded ${
              activeTab === "weather"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Weather
          </button>
          <button
            onClick={() => setActiveTab("air")}
            className={`px-4 py-2 rounded ${
              activeTab === "air"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Air Quality
          </button>
        </div>

        {activeTab === "weather" ? (
          <HourlyCharts hourlyWeatherData={hourlyWeatherData} />
        ) : (
          <AirQualityCharts hourlyAirQualityData={hourlyAirQualityData} />
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;