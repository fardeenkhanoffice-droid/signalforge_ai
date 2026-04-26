const BASE_URL = "https://api.twelvedata.com";
const KEY_PART_1 = "9bc1a41a";
const KEY_PART_2 = "408448c2";
const KEY_PART_3 = "80d03f52";
const KEY_PART_4 = "d7225e5c";

const API_KEY = KEY_PART_1 + KEY_PART_2 + KEY_PART_3 + KEY_PART_4;

export async function getCandles(interval = "5min") {
  const url = `${BASE_URL}/time_series?symbol=EUR/USD&interval=${interval}&apikey=${API_KEY}&outputsize=20`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.values || [];
  } catch {
    return [];
  }
}
