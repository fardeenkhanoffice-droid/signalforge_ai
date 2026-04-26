const API_KEY = "9bc1a41a408448c280d03f52d7225e5c";

export async function getCandles(interval = "5min") {
  const url = `https://api.twelvedata.com/time_series?symbol=EUR/USD&interval=${interval}&apikey=${API_KEY}&outputsize=20`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data.values || [];
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}
