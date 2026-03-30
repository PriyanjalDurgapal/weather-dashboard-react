import ChartWrapper from "../charts/ChartWrapper";

const AirQualityCharts = ({ hourlyAirQualityData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ChartWrapper
      title="PM10 & PM2.5"
      data={hourlyAirQualityData}
      dataKeys={["pm10", "pm2_5"]}
      colors={["#f59e0b", "#ef4444"]}
    />
    <ChartWrapper title="CO" data={hourlyAirQualityData} dataKey="co" color="#3b82f6" />
    <ChartWrapper title="NO2" data={hourlyAirQualityData} dataKey="no2" color="#8b5cf6" />
    <ChartWrapper title="SO2" data={hourlyAirQualityData} dataKey="so2" color="#10b981" />
    <ChartWrapper title="CO2" data={hourlyAirQualityData} dataKey="co2" color="#22c55e" />
    <ChartWrapper title="Air Quality Index" data={hourlyAirQualityData} dataKey="aqi" color="#8b5cf6" />
  </div>
);

export default AirQualityCharts;