// src/components/weather/CurrentWeatherHeader.jsx
import WeatherIcon from "./WeatherIcon";
import WeatherCard from "./WeatherCard";

const CurrentWeatherHeader = ({ weather, tempNow, tempF, condition, bgGradient }) => {
  return (
    <div className={`bg-gradient-to-r ${bgGradient} text-white rounded-2xl shadow-xl p-6 mb-8 relative`}>
      {/* Clouds */}
      <div className="absolute top-10 left-0 w-44 h-24 bg-white/60 rounded-full blur-lg animate-cloud shadow-2xl" />
      <div className="absolute top-24 right-10 w-56 h-28 bg-white/50 rounded-full blur-lg animate-cloud-slow shadow-xl" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <WeatherIcon code={weather.current_weather?.weathercode ?? 0} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Current Weather</h1>
            <p className="opacity-80 text-sm">{new Date().toDateString()}</p>
          </div>
        </div>
        <div className="text-4xl sm:text-5xl font-bold">
          {tempNow !== undefined ? `${tempNow.toFixed(1)}°C / ${tempF}°F` : "Loading..."}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        <WeatherCard title="Temp Max" value={weather.daily?.temperature_2m_max?.[0]} unit="°C" />
        <WeatherCard title="Temp Min" value={weather.daily?.temperature_2m_min?.[0]} unit="°C" />
        <WeatherCard title="Wind Speed" value={weather.daily?.windspeed_10m_max?.[0]} unit=" m/s" />
        <WeatherCard title="Sunrise" value={new Date(weather.daily?.sunrise?.[0]).toLocaleTimeString("en-IN")} />
        <WeatherCard title="Sunset" value={new Date(weather.daily?.sunset?.[0]).toLocaleTimeString("en-IN")} />
      </div>
    </div>
  );
};

export default CurrentWeatherHeader;