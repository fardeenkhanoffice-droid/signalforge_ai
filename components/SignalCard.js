export default function SignalCard() {
  return `
    <div class="bg-gray-900 p-4 rounded-2xl">
      <h2 class="text-sm opacity-70">Current Signal</h2>

      <div id="signalBox" class="mt-3">
        <p class="text-lg font-bold">No Signal Yet</p>
        <p class="text-xs opacity-60">
          Waiting for analysis...
        </p>
      </div>
    </div>
  `;
}

export function updateSignalUI(result) {
  const box = document.getElementById("signalBox");

  if (!result || !result.signal) {
    box.innerHTML = `<p>No valid signal</p>`;
    return;
  }

  box.innerHTML = `
    <p class="text-lg font-bold text-green-400">
      ${result.signal}
    </p>
    <p class="text-xs opacity-60">
      Trend: ${result.trend}
    </p>
  `;
}
