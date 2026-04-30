import { getCandles } from "../services/api.js";
import { runCustomStrategy } from "../core/StrategyEngine.js"; // ✅ FIXED CASE

export default function StrategyPage() {
  return `
    <div class="space-y-4">

      <h2 class="text-lg font-bold">Strategy Builder</h2>

      <!-- Trend -->
      <select id="trend" class="w-full p-2 bg-gray-900 rounded">
        <option value="ANY">Any Trend</option>
        <option value="UP">Uptrend</option>
        <option value="DOWN">Downtrend</option>
      </select>

      <!-- Pattern -->
      <select id="pattern" class="w-full p-2 bg-gray-900 rounded">
        <option value="BULLISH_ENGULFING">Bullish Engulfing</option>
        <option value="BEARISH_ENGULFING">Bearish Engulfing</option>
      </select>

      <button onclick="runCustomTest()"
        class="w-full py-3 bg-cyan-400 text-black rounded-xl">
        Run Backtest
      </button>

      <div id="resultBox" class="bg-gray-900 p-4 rounded-xl mt-3 text-sm">
        No results yet
      </div>

    </div>
  `;
}

/* ✅ SAFE FUNCTION */

window.runCustomTest = async function () {
  const box = document.getElementById("resultBox");

  try {
    const trend = document.getElementById("trend").value;
    const pattern = document.getElementById("pattern").value;

    const config = { trend, pattern };

    box.innerHTML = "Running backtest... ⏳";

    const candles = await getCandles("5min");

    if (!candles || candles.length === 0) {
      throw new Error("No market data received");
    }

    const result = runCustomStrategy(candles, config);

    if (!result) {
      throw new Error("Strategy returned no result");
    }

    box.innerHTML = `
      <p>Total Trades: ${result.total ?? 0}</p>
      <p class="text-green-400">Wins: ${result.wins ?? 0}</p>
      <p class="text-red-400">Losses: ${result.losses ?? 0}</p>
      <p>Win Rate: ${result.winRate ?? 0}%</p>
    `;
  } catch (err) {
    console.error("Backtest Error:", err);

    box.innerHTML = `
      <p class="text-red-400">Error: ${err.message}</p>
    `;
  }
};
