
export const getCache = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  const parsed = JSON.parse(data);

  // expire after 10 min
  if (Date.now() - parsed.timestamp > 10 * 60 * 1000) {
    localStorage.removeItem(key);
    return null;
  }

  return parsed.value;
};

export const setCache = (key, value) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      value,
      timestamp: Date.now(),
    })
  );
};