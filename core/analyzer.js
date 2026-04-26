export function analyzeMarket(candles) {
  if (!candles || candles.length < 5) {
    return { signal: null };
  }

  const latest = candles[0];
  const prev = candles[1];

  const latestClose = parseFloat(latest.close);
  const prevClose = parseFloat(prev.close);

  // Simple trend logic
  let trend = latestClose > prevClose ? "UP" : "DOWN";

  // Basic signal logic
  let signal = null;

  if (trend === "UP") {
    signal = "CALL";
  } else {
    signal = "PUT";
  }

  return {
    signal,
    trend,
    entry: latestClose,
  };
}
