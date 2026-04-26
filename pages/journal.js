import { getTrades } from "../utils/storage.js";

export default function Journal() {
  const trades = getTrades().reverse();

  if (!trades.length) {
    return `
      <div class="text-center opacity-60 mt-10">
        No trades yet
      </div>
    `;
  }

  return `
    <div class="space-y-3">
      ${trades.map(t => `
        <div class="bg-gray-900 p-3 rounded-xl">
          <div class="flex justify-between">
            <span>${t.signal}</span>
            <span class="${t.result === "WIN" ? "text-green-400" : "text-red-400"}">
              ${t.result}
            </span>
          </div>

          <div class="text-xs opacity-70 mt-1">
            Trend: ${t.trend} | Confidence: ${t.confidence}%
          </div>

          <div class="text-xs opacity-70">
            Entry: ${t.entry}
          </div>

          <div class="text-xs mt-1">
            ${t.note || ""}
          </div>

          <div class="text-[10px] opacity-50 mt-1">
            ${new Date(t.time).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
