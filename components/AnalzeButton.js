import { getCandles } from "../services/api.js";
import { analyzeMarket } from "../core/analyzer.js";
import { updateSignalUI } from "./SignalCard.js";

export default function AnalyzeButton() {
  return `
    <button onclick="analyzeMarketNow()"
      class="w-full py-3 rounded-2xl bg-cyan-400 text-black font-bold">
      Analyze Market
    </button>
  `;
}

window.analyzeMarketNow = async function () {
  try {
    alert("Fetching market data...");

    const candles = await getCandles("5min");
    const result = analyzeMarket(candles);

    console.log("Analysis:", result);

    // Update UI
    updateSignalUI(result);

    // Optional alert summary
    alert(`Signal: ${result.signal}\nTrend: ${result.trend}`);
  } catch (error) {
    console.error("Error analyzing market:", error);
    alert("Failed to analyze market. Please try again.");
  }
};
