import { WiThermometer, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";

const iconMap = {
  "Temp Max": <WiThermometer />,
  "Temp Min": <WiThermometer />,
  "Wind Speed": <WiStrongWind />,
  Sunrise: <WiSunrise />,
  Sunset: <WiSunset />,
};

const WeatherCard = ({ title, value, unit }) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition duration-300 hover:scale-105">
      <div className="text-3xl text-white mb-1">
        {iconMap[title] || <WiThermometer />}
      </div>

      <p className="text-sm text-white/80">{title}</p>

      <p className="text-xl font-bold text-white">
        {value ?? "--"}
        {unit}
      </p>
    </div>
  );
};

export default WeatherCard;