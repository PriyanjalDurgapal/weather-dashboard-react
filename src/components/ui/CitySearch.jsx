// src/components/common/CitySearch.jsx
import { useState, useEffect } from "react";
import { getCitySuggestions } from "../../services/weatherService";

const CitySearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔥 Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        getCitySuggestions(query).then(setSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      
      {/* Input */}
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-xl border shadow-sm focus:outline-none"
      />

      {/* Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-xl mt-2 max-h-60 overflow-auto">
          {suggestions.map((city) => (
            <div
              key={city.id}
              onClick={() => {
                onSelect(city);
                setQuery(city.name);
                setSuggestions([]);
              }}
              className="p-3 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}, {city.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;