import axios from "axios";
import { getCache, setCache } from "../utils/cache";

const apiClient = axios.create({
  baseURL: "https://api.open-meteo.com/v1/forecast",
  timeout: 5000,
});

// 🌤 Current Weather
export const getCurrentWeather = async (lat, lon, date) => {
  try {
    const key = `weather-${lat}-${lon}-${date}`;
    const cached = getCache(key);
    if (cached) return cached;

    const response = await apiClient.get("", {
      params: {
        latitude: lat,
        longitude: lon,
        hourly:
          "temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,uv_index,visibility,precipitation_probability",
        daily:
          "temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max",
        timezone: "auto",
        start_date: date,
        end_date: date,
      },
    });

    setCache(key, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

// 🌫 Air Quality
export const getAirQuality = async (lat, lon, date) => {
  try {
    const key = `air-${lat}-${lon}-${date}`;
    const cached = getCache(key);
    if (cached) return cached;

    const response = await axios.get(
      "https://air-quality-api.open-meteo.com/v1/air-quality",
      {
        params: {
          latitude: lat,
          longitude: lon,
          hourly:
            "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide",
          timezone: "auto",
          start_date: date,
          end_date: date,
        },
      }
    );

    setCache(key, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching air quality:", error);
    throw error;
  }
};

// 📊 Historical Weather
export const getHistoricalWeather = async (lat, lon, start, end) => {
  try {
    const key = `history-${lat}-${lon}-${start}-${end}`;
    const cached = getCache(key);
    if (cached) return cached;

    const response = await axios.get(
      "https://archive-api.open-meteo.com/v1/archive",
      {
        params: {
          latitude: lat,
          longitude: lon,
          start_date: start,
          end_date: end,
         hourly: "temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m",
          timezone: "auto",
        },
      }
    );

    setCache(key, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching historical weather:", error);
    throw error;
  }
};

// 🌍 City Search
export const getCitySuggestions = async (query) => {
  if (!query) return [];

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`
    );
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error fetching city:", err);
    return [];
  }
};