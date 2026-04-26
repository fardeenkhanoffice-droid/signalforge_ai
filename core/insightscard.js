import { generateInsights } from "../core/insights.js";

export default function InsightsCard() {
  const insights = generateInsights();

  return `
    <div class="bg-gray-900 p-4 rounded-2xl">
      <h2 class="text-sm opacity-70">AI Insights</h2>

      <div class="mt-3 space-y-2">
        ${insights.map(i => `
          <p class="text-xs bg-gray-800 p-2 rounded">
            ${i}
          </p>
        `).join("")}
      </div>
    </div>
  `;
}
