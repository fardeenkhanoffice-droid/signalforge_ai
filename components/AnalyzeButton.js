import { getCandles } from "../services/api.js";
import { analyzeMarket } from "../core/analyzer.js";
import { updateSignalUI } from "./SignalCard.js";
import { saveTrade } from "../utils/storage.js";

export default function AnalyzeButton() {
  return `
    <button onclick="analyzeMarketNow()"
      class="w-full py-3 rounded-2xl bg-cyan-400 text-black font-bold">
      Analyze Market
    </button>
  `;
}

// 🔍 ANALYZE MARKET
window.analyzeMarketNow = async function () {
  try {
    alert("Fetching market data...");

    const candles = await getCandles("5min");
    const result = analyzeMarket(candles);

    console.log("Analysis:", result);

    updateSignalUI(result);

    alert(`Signal: ${result.signal || "NONE"}\nTrend: ${result.trend || "N/A"}`);
  } catch (error) {
    console.error("Error analyzing market:", error);
    alert("Failed to analyze market.");
  }
};

// ✅ SAVE RESULT TO STORAGE + RELOAD

window.markWin = function () {
  if (!window.lastSignal || !window.lastSignal.signal) {
    return alert("No signal to save");
  }

  saveTrade({
    ...window.lastSignal,
    result: "WIN",
    time: new Date().toISOString(),
  });

  console.log("Saved WIN:", window.lastSignal);
  alert("Saved as WIN ✅");

  window.location.reload();
};

window.markLoss = function () {
  if (!window.lastSignal || !window.lastSignal.signal) {
    return alert("No signal to save");
  }

  saveTrade({
    ...window.lastSignal,
    result: "LOSS",
    time: new Date().toISOString(),
  });

  console.log("Saved LOSS:", window.lastSignal);
  alert("Saved as LOSS ❌");

  window.location.reload();
};
