export default function SignalCard() {
  return `
    <div class="bg-gray-900 p-4 rounded-2xl">
      <h2 class="text-sm opacity-70">Current Signal</h2>

      <div class="mt-3">
        <p class="text-lg font-bold">No Signal Yet</p>
        <p class="text-xs opacity-60">
          Waiting for market conditions...
        </p>
      </div>
    </div>
  `;
}
