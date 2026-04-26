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

  if (!box) return;

  // No result or invalid signal
  if (!result || !result.signal) {
    box.innerHTML = `
      <p class="text-yellow-400 font-bold">No Trade</p>
      <p class="text-xs opacity-60">
        ${result?.message || "Market conditions not clear"}
      </p>
    `;
    return;
  }

  // Color based on signal
  const color =
    result.signal === "CALL"
      ? "text-green-400"
      : result.signal === "PUT"
      ? "text-red-400"
      : "text-yellow-400";

  box.innerHTML = `
    <p class="text-lg font-bold ${color}">
      ${result.signal}
    </p>

    <p class="text-xs mt-1">Trend: ${result.trend || "N/A"}</p>
    <p class="text-xs">Confidence: ${result.confidence ?? "N/A"}%</p>
    <p class="text-xs">Expiry: ${result.expiry || "N/A"}</p>

    <p class="text-xs mt-2 opacity-70">
      ${result.reason || ""}
    </p>
  `;
}
