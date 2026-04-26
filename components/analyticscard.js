import { calculateStats } from "../core/analytics.js";

export default function AnalyticsCard() {
  const stats = calculateStats();

  return `
    <div class="bg-gray-900 p-4 rounded-2xl">
      <h2 class="text-sm opacity-70">Performance</h2>

      <div class="mt-3 space-y-1">
        <p>Total Trades: ${stats.total}</p>
        <p class="text-green-400">Wins: ${stats.wins}</p>
        <p class="text-red-400">Losses: ${stats.losses}</p>
        <p>Win Rate: ${stats.winRate}%</p>
      </div>
    </div>
  `;
}
