// src/utils/aqi.js

export const getAQIColor = (pm25) => {
  if (pm25 <= 12) return "bg-green-500";
  if (pm25 <= 35) return "bg-yellow-400";
  if (pm25 <= 55) return "bg-orange-400";
  if (pm25 <= 150) return "bg-red-500";
  return "bg-purple-600";
};