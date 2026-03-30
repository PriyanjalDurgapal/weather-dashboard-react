// src/components/weather/WeatherIcon.jsx
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from "react-icons/wi";

const weatherCodeMap = {
  0: "Clear", 1: "Clear",
  2: "Clouds", 3: "Clouds",
  61: "Rain", 63: "Rain", 65: "Rain",
  71: "Snow", 73: "Snow", 75: "Snow",
};

const WeatherIcon = ({ code }) => {
  const condition = weatherCodeMap[code] || "Clear";
  switch (condition) {
    case "Clear":
      return <WiDaySunny className="text-yellow-300 text-7xl animate-spin-slow" />;
    case "Clouds":
      return <WiCloudy className="text-gray-300 text-7xl animate-pulse" />;
    case "Rain":
      return <WiRain className="text-blue-300 text-7xl animate-bounce" />;
    case "Snow":
      return <WiSnow className="text-white text-7xl animate-fade" />;
    default:
      return <WiDaySunny className="text-yellow-300 text-7xl" />;
  }
};

export default WeatherIcon;
export { weatherCodeMap };