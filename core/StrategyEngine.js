export function runCustomStrategy(candles, config) {
  if (!candles || candles.length < 20) {
    return { total: 0, wins: 0, losses: 0, winRate: 0 };
  }

  const parsed = candles.map(c => ({
    open: parseFloat(c.open),
    close: parseFloat(c.close),
  }));

  let wins = 0;
  let losses = 0;

  for (let i = 1; i < parsed.length - 1; i++) {
    const prev = parsed[i - 1];
    const curr = parsed[i];
    const next = parsed[i + 1];

    // 🧠 TREND CHECK
    let trend = curr.close > prev.close ? "UP" : "DOWN";
    if (config.trend !== "ANY" && trend !== config.trend) continue;

    // 🕯️ PATTERN CHECK
    let bullish =
      prev.close < prev.open &&
      curr.close > curr.open &&
      curr.close > prev.open;

    let bearish =
      prev.close > prev.open &&
      curr.close < curr.open &&
      curr.close < prev.open;

    let matchPattern = false;

    if (config.pattern === "BULLISH_ENGULFING" && bullish) {
      matchPattern = true;
    }

    if (config.pattern === "BEARISH_ENGULFING" && bearish) {
      matchPattern = true;
    }

    if (!matchPattern) continue;

    // 🎯 RESULT SIMULATION
    if (config.pattern === "BULLISH_ENGULFING") {
      if (next.close > curr.close) wins++;
      else losses++;
    }

    if (config.pattern === "BEARISH_ENGULFING") {
      if (next.close < curr.close) wins++;
      else losses++;
    }
  }

  const total = wins + losses;
  const winRate = total ? ((wins / total) * 100).toFixed(1) : 0;

  return { total, wins, losses, winRate };
}
