import { getCandles } from "../services/api.js";
import { runBacktest } from "../core/strategyEngine.js";

export default function StrategyPage() {
  return `
    <div class="space-y-4">

      <h2 class="text-lg font-bold">Strategy Builder</h2>

      <button onclick="runTest()"
        class="w-full py-3 bg-cyan-400 text-black rounded-xl">
        Run Backtest
      </button>

      <div id="resultBox" class="bg-gray-900 p-4 rounded-xl mt-3">
        No results yet
      </div>

    </div>
  `;
}

window.runTest = async function () {
  const candles = await getCandles("5min");
  const result = runBacktest(candles);

  document.getElementById("resultBox").innerHTML = `
    <p>Total Trades: ${result.total}</p>
    <p class="text-green-400">Wins: ${result.wins}</p>
    <p class="text-red-400">Losses: ${result.losses}</p>
    <p>Win Rate: ${result.winRate}%</p>
  `;
};
