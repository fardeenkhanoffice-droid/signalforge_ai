export default function RiskCard() {
  return `
    <div class="bg-gray-900 p-4 rounded-2xl">
      <h2 class="text-sm opacity-70">Risk Status</h2>

      <div class="mt-2 space-y-1">
        <p>Risk per Trade: 2%</p>
        <p>Daily Loss Limit: 10%</p>
        <p>Trades Today: 0 / 10</p>
      </div>
    </div>
  `;
}
