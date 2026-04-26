import { getCandles } from "../services/api.js";
import { analyzeMarket } from "../core/analyzer.js";

export default function AnalyzeButton() {
  return `
    <button onclick="analyzeMarketNow()"
      class="w-full py-3 rounded-2xl bg-cyan-400 text-black font-bold">
      Analyze Market
    </button>
  `;
}

window.analyzeMarketNow = async function () {
  alert("Fetching market data...");

  const candles = await getCandles("5min");
  const result = analyzeMarket(candles);

  console.log("Analysis:", result);

  alert(`Signal: ${result.signal}\nTrend: ${result.trend}`);
};
