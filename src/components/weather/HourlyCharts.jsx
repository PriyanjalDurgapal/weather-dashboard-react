// src/components/weather/HourlyCharts.jsx
import ChartWrapper from "../charts/ChartWrapper";

const HourlyCharts = ({ hourlyWeatherData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ChartWrapper title="Temperature (°C)" data={hourlyWeatherData} dataKey="temperature" color="#f97316" />
    <ChartWrapper title="Humidity (%)" data={hourlyWeatherData} dataKey="humidity" color="#3b82f6" />
    <ChartWrapper title="Precipitation (mm)" data={hourlyWeatherData} dataKey="precipitation" color="#60a5fa" />
    <ChartWrapper title="Wind Speed (m/s)" data={hourlyWeatherData} dataKey="windspeed" color="#10b981" />
    <ChartWrapper title="UV Index" data={hourlyWeatherData} dataKey="uv_index" color="#facc15" />
    <ChartWrapper title="Visibility (km)" data={hourlyWeatherData} dataKey="visibility" color="#3b82f6" />
    <ChartWrapper title="Precipitation Probability (%)" data={hourlyWeatherData} dataKey="precipitation_probability" color="#60a5fa" />
  </div>
);

export default HourlyCharts;