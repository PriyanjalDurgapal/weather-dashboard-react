// src/pages/weather/HistoricalWeather.jsx
import { useState, useEffect, useMemo } from "react";
import { getHistoricalWeather, getAirQuality } from "../../services/weatherService";
import ChartWrapper from "../../components/charts/ChartWrapper";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import CitySearch from "../../components/ui/CitySearch";

const HistoricalWeather = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [data, setData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [error, setError] = useState("");

  // Default last 7 days
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState(past.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  // Get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setCoords({ lat: 28.6139, lon: 77.209 })
    );
  }, []);

  const handleCitySelect = (city) => {
    setCoords({
      lat: city.latitude,
      lon: city.longitude,
    });
  };

  // 🔥 Fetch data with validation
  useEffect(() => {
    if (!coords.lat) return;

    const diff =
      (new Date(endDate) - new Date(startDate)) /
      (1000 * 60 * 60 * 24);

    if (diff > 730) {
      setError("Max range is 2 years");
      return;
    }

    setError("");

    Promise.all([
      getHistoricalWeather(coords.lat, coords.lon, startDate, endDate),
      getAirQuality(coords.lat, coords.lon, startDate, endDate),
    ])
      .then(([weatherRes, airRes]) => {
        setData(weatherRes);
        setAirData(airRes);
      })
      .catch(console.error);
  }, [coords, startDate, endDate]);

  // WEATHER DATA
  const chartData = useMemo(() => {
    if (!data) return [];

    return data.hourly.time.map((t, i) => ({
      time: t.split("T")[0] + " " + t.split("T")[1].slice(0, 5),
      temperature: data.hourly.temperature_2m[i],
      humidity: data.hourly.relativehumidity_2m[i],
      precipitation: data.hourly.precipitation[i],
      windspeed: data.hourly.windspeed_10m[i],
      winddirection: data.hourly.winddirection_10m?.[i] ?? 0,
    }));
  }, [data]);

  // AIR QUALITY DATA
  const airChartData = useMemo(() => {
    if (!airData) return [];

    return airData.hourly.time.map((t, i) => ({
      time: t.split("T")[0] + " " + t.split("T")[1].slice(0, 5),
      pm10: airData.hourly.pm10?.[i] ?? 0,
      pm2_5: airData.hourly.pm2_5?.[i] ?? 0,
    }));
  }, [airData]);

  if (!data || !airData) return <LoadingSkeleton />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Historical Weather</h1>

      <div className="mb-4">
        <CitySearch onSelect={handleCitySelect} />
      </div>

      {/* DATE FILTER */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* WEATHER CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartWrapper
          title="Temperature (°C)"
          data={chartData}
          dataKey="temperature"
          color="#f97316"
        />
        <ChartWrapper
          title="Humidity (%)"
          data={chartData}
          dataKey="humidity"
          color="#3b82f6"
        />
        <ChartWrapper
          title="Precipitation (mm)"
          data={chartData}
          dataKey="precipitation"
          color="#60a5fa"
        />
        <ChartWrapper
          title="Wind Speed (m/s)"
          data={chartData}
          dataKey="windspeed"
          color="#10b981"
        />
        <ChartWrapper
          title="Wind Direction (°)"
          data={chartData}
          dataKey="winddirection"
          color="#8b5cf6"
        />
      </div>

      {/* AIR QUALITY CHARTS */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        Air Quality (Historical)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartWrapper
          title="PM10"
          data={airChartData}
          dataKey="pm10"
          color="#ef4444"
        />
        <ChartWrapper
          title="PM2.5"
          data={airChartData}
          dataKey="pm2_5"
          color="#f59e0b"
        />
      </div>
    </div>
  );
};

export default HistoricalWeather;