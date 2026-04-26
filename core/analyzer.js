export function analyzeMarket(candles) {
  if (!candles || candles.length < 10) {
    return { signal: null };
  }

  // Parse candles
  const parsed = candles.map(c => ({
    open: parseFloat(c.open),
    close: parseFloat(c.close),
    high: parseFloat(c.high),
    low: parseFloat(c.low),
  }));

  const latest = parsed[0];
  const prev = parsed[1];

  // 🧠 TREND DETECTION
  let trend = "SIDEWAYS";
  if (latest.close > prev.close) trend = "UP";
  if (latest.close < prev.close) trend = "DOWN";

  // 🕯️ PATTERNS
  const isBullishEngulfing =
    prev.close < prev.open &&
    latest.close > latest.open &&
    latest.close > prev.open &&
    latest.open < prev.close;

  const isBearishEngulfing =
    prev.close > prev.open &&
    latest.close < latest.open &&
    latest.open > prev.close &&
    latest.close < prev.open;

  // 📊 SUPPORT / RESISTANCE
  const highs = parsed.slice(0, 10).map(c => c.high);
  const lows = parsed.slice(0, 10).map(c => c.low);

  const resistance = Math.max(...highs);
  const support = Math.min(...lows);

  const nearSupport = latest.close <= support * 1.002;
  const nearResistance = latest.close >= resistance * 0.998;

  // 🎯 SIGNAL LOGIC
  let signal = null;
  let reason = "";
  let confidence = 0;

  if (trend === "UP" && isBullishEngulfing && nearSupport) {
    signal = "CALL";
    reason = "Bullish engulfing at support in uptrend";
    confidence = 80;
  }

  if (trend === "DOWN" && isBearishEngulfing && nearResistance) {
    signal = "PUT";
    reason = "Bearish engulfing at resistance in downtrend";
    confidence = 80;
  }

  // ❌ NO SIGNAL
  if (!signal) {
    const noSignalResult = {
      signal: null,
      message: "No strong setup",
    };

    window.lastSignal = noSignalResult; // ✅ save even no-signal
    return noSignalResult;
  }

  // ⏱️ EXPIRY
  const expiry = "2 min";

  const finalResult = {
    signal,
    trend,
    confidence,
    expiry,
    entry: latest.close,
    reason,
  };

  // ✅ SAVE LAST SIGNAL HERE (correct place)
  window.lastSignal = finalResult;

  return finalResult;
}
